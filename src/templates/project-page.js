import { graphql } from 'gatsby';
import React, { useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Layout, { Ctx } from '../components/Layout';
import Img from '../components/PreviewCompatibleImage';
import styles from './project-page.module.scss';
import _ from 'lodash';
import RelatedProjects from '../components/RelatedProjects';

const ProjectImg = ({ image, index }) => {
  const { state, dispatch } = useContext(Ctx);
  const [ref, inView] = useInView({ threshold: [1, 0.5] });

  useEffect(() => {
    if (inView) {
      dispatch({
        type: 'SET_CASE_IMAGE',
        project: { caseImages: [...state.caseImages, index] },
      });
    } else {
      const last = _.last(state.caseImages);
      if (last === index && last !== 0) {
        dispatch({
          type: 'SET_CASE_IMAGE',
          project: {
            caseImages: state.caseImages.slice(0, -1),
          },
        });
      }
    }
  }, [inView]);

  return (
    <div ref={ref} className={styles.image}>
      <Img imageInfo={image} />
    </div>
  );
};

export const ProjectPagePreviewTemplate = ({ images = [] }) => (
  <div style={{ margin: '0 auto', maxWidth: '816px' }}>
    {images.map((image, index) => (
      <Img
        key={index}
        imageInfo={image}
        style={{ width: '100%', height: 'auto', marginBottom: '8px' }}
      />
    ))}
  </div>
);

const ProjectPageTemplate = ({ title, category, images }) => {
  const { dispatch } = useContext(Ctx);
  useEffect(() => {
    dispatch({
      type: 'SET_CASE',
      project: { title, images: images.length },
    });

    dispatch({ type: 'SHOW_PROJECT_META' });
  }, [dispatch, title, images]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.images}>
          {images.map((image, index) => (
            <ProjectImg key={index} {...{ image, index }} />
          ))}
        </div>
      </div>
      <RelatedProjects currentProject={{ title, category }} />
    </>
  );
};

const ProjectPage = ({ data, location }) => {
  const {
    frontmatter: { title, category, images },
  } = data.markdownRemark;

  return (
    <Layout {...{ title, location }}>
      <ProjectPageTemplate {...{ title, category, images }} />
    </Layout>
  );
};

export default ProjectPage;

export const pageQuery = graphql`
  query ProjectPageTemplateByCategory($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        category
        images {
          image {
            id
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
              original {
                height
                width
              }
            }
          }
        }
      }
    }
  }
`;
