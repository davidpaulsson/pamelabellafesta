import { graphql } from 'gatsby';
import React, { useContext, useEffect } from 'react';
import _ from 'lodash';
import Layout, { Ctx } from '../components/Layout';
import RelatedProjects from '../components/RelatedProjects';
import Fade from '../components/Fade';
import styles from './project-page.module.scss';
import './project-page.scss';

const parsePostContents = (contents) => contents
  .replace('<html><head></head><body>', '')
  .replace('</body></html>', '')
  .replace('<p><div', '<div')
  .replace('<p></p>', '')
  .replace('</p>\n', '')
  .replace(/<\/noscript><\/div>/g, '</noscript></div></div>');

const ProjectPageWithCtx = ({ title, content }) => {
  const { state, dispatch } = useContext(Ctx);

  const fixVideoAspectRatio = () => {
    const videos = document.querySelectorAll('video');
    [...videos].map((video) => {
      if (video.videoHeight > video.videoWidth) {
        const percentage = `${video.videoHeight / video.videoWidth * 100}%`;
        video.parentElement.style.paddingBottom = percentage;
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', _.throttle(fixVideoAspectRatio, 1000));
    return window.removeEventListener('scroll', _.throttle(fixVideoAspectRatio, 1000));
  }, []);

  useEffect(() => {
    let observers;

    if ('IntersectionObserver' in window) {
      const options = { threshold: [0.5, 0.5] };
      const els = document.querySelectorAll('.gatsby-image-wrapper, .wp-video');
      observers = [...els].map((el, index) => {
        const observer = new IntersectionObserver(((entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {

            } else {
              dispatch({
                type: 'SET_CASE_IMAGE',
                project: { caseImages: [...state.caseImages, index + 1] },
              });
            }
          });
        }), options);

        observer.observe(el);

        return { observer, el };
      });
    }

    return () => observers.map(({ observer, el }) => observer.unobserve(el));
  }, [dispatch, state.images]);

  useEffect(() => {
    const els = document.querySelectorAll('.gatsby-image-wrapper, .wp-video');

    dispatch({
      type: 'SET_CASE',
      project: { title, images: els.length },
    });

    dispatch({ type: 'SHOW_PROJECT_META' });

    return () => dispatch({ type: 'HIDE_PROJECT_META' });
  }, [dispatch, title]);

  return (
    <Fade>
      <div className={styles.wrapper}>
        <div
          className={styles.images}
          dangerouslySetInnerHTML={{
            __html: parsePostContents(content),
          }}
        />
      </div>
    </Fade>
  );
};

const ProjectPage = ({ data, location }) => {
  const {
    // eslint-disable-next-line camelcase
    title, content, categories, featured_media,
  } = data.wordpressPost;

  return (
    <Layout
      {...{ location, title }}
      shareImage={featured_media?.localFile?.childImageSharp?.original?.src}
    >
      <ProjectPageWithCtx {...{ title, content }} />
      <RelatedProjects
        currentProject={{ title, category: categories[0].name }}
      />
    </Layout>
  );
};

export default ProjectPage;

export const pageQuery = graphql`
  query WordpressPost($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      categories {
        name
      }
      content
      featured_media {
        localFile {
          childImageSharp {
            original {
              src
            }
          }
        }
      }
    }
  }
`;
