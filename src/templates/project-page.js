import { graphql } from 'gatsby';
import React, { useContext, useRef, useEffect } from 'react';
import useInView from 'react-cool-inview';
import Layout, { Ctx } from '../components/Layout';
import Img from '../components/PreviewCompatibleImage';
import RelatedProjects from '../components/RelatedProjects';
import styles from './project-page.module.scss';
import _ from 'lodash';

const ProjectImg = ({ image, index }) => {
  const { state, dispatch } = useContext(Ctx);
  const ref = useRef();
  useInView(ref, {
    threshold: 0.25,
    onEnter: () => {
      dispatch({
        type: 'SET_CASE_IMAGE',
        project: { caseImages: [...state.caseImages, index + 1] },
      });
    },
    onLeave: () => {
      dispatch({
        type: 'SET_CASE_IMAGE',
        project: {
          caseImages: state.caseImages.filter((i) => i !== index + 1),
        },
      });
    },
  });

  return (
    <div ref={ref} className={styles.image}>
      <Img imageInfo={image} />
    </div>
  );
};

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
          {images &&
            images.map((image, index) => (
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
              fluid(maxWidth: 1600, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
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
