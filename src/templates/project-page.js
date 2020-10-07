import { graphql } from 'gatsby';
import React, { useContext, useEffect } from 'react';
import Layout, { Ctx } from '../components/Layout';
import RelatedProjects from '../components/RelatedProjects';
import styles from './project-page.module.scss';
import './project-page.scss';

const parsePostContents = (contents) =>
  contents
    .replace('<html><head></head><body>', '')
    .replace('</body></html>', '')
    .replace('<p><div', '<div')
    .replace('<p></p>', '')
    .replace('</p>\n', '')
    .replace(/<\/noscript><\/div>/g, '</noscript></div></div>');

const ProjectPageWithCtx = ({ title, content }) => {
  const { state, dispatch } = useContext(Ctx);

  useEffect(() => {
    const options = { rootMargin: '0px' };

    const els = document.querySelectorAll('.gatsby-image-wrapper, .wp-video');
    const observers = [...els].map((el, index) => {
      const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          } else {
            dispatch({
              type: 'SET_CASE_IMAGE',
              project: { caseImages: [...state.caseImages, index + 1] },
            });
          }
        });
      }, options);

      observer.observe(el);

      return { observer, el };
    });

    return () => observers.map(({ observer, el }) => observer.unobserve(el));
  }, [dispatch, state.caseImages]);

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
    <div className={styles.wrapper}>
      <div
        className={styles.images}
        dangerouslySetInnerHTML={{
          __html: parsePostContents(content),
        }}
      />
    </div>
  );
};

const ProjectPage = ({ data, location }) => {
  const { title, content, categories } = data.wordpressPost;

  return (
    <Layout {...{ location, title }}>
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
    }
  }
`;
