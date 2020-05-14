import { graphql } from 'gatsby';
import React, { useEffect, useContext } from 'react';
import Layout, { Ctx } from '../components/Layout';
import Img from '../components/PreviewCompatibleImage';
import styles from './project-page.module.scss';
import { useInView } from 'react-intersection-observer';
import _ from 'lodash';

const ProjectImg = ({ image, index }) => {
  const { state, dispatch } = useContext(Ctx);
  const [ref, inView, entry] = useInView({
    /* Optional options */
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      dispatch({
        type: 'SET_CASE_IMAGE',
        project: { caseImages: [...state.caseImages, index] },
      });
    } else {
      dispatch({
        type: 'SET_CASE_IMAGE',
        project: {
          caseImages: state.caseImages.filter((n) => n !== index),
        },
      });
    }
  }, [dispatch, inView]);

  return (
    <div ref={ref} className={styles.image}>
      <Img key={index} imageInfo={image} />
    </div>
  );
};

export const ProjectPageTemplate = ({ title, images }) => {
  const { dispatch } = useContext(Ctx);

  useEffect(() => {
    dispatch({
      type: 'SET_CASE',
      project: { title, images: images.length },
    });
  }, [dispatch, title, images]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.images}>
        {images.map((image, index) => (
          <ProjectImg {...{ image, index }} />
        ))}
      </div>
    </div>
  );
};

const ProjectPage = ({ data, location }) => {
  const {
    frontmatter: { title, images },
  } = data.markdownRemark;

  return (
    <Layout {...{ location }}>
      <ProjectPageTemplate {...{ title, images }} />
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
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
