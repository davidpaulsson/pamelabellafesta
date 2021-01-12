import { graphql } from 'gatsby';
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import ProjectCategoryList from '../components/ProjectCategoryList';
import Fade from '../components/Fade';

const ProjectCategoryPage = ({ data, location }) => {
  useEffect(() => {
    document.body.style.overflow = 'auto';
  }, []);

  return (
    <Layout
      title={data.wpCategory.name}
      {...{ location }}
      isCategoryPage
    >
      <Fade>
        <ProjectCategoryList projects={data.allWpPost.edges} />
      </Fade>
    </Layout>
  );
};

export default ProjectCategoryPage;

export const pageQuery = graphql`
  query ProjectCategoryPageTemplateByID($id: String!) {
    wpCategory(id: { eq: $id }) {
      name
    }
    allWpPost(
      filter: { categories: { nodes: { elemMatch: { id: { eq: $id } } } } }
      sort: { fields: date, order: DESC }
    ) {
      edges {
        node {
          id
          title
          slug
          categories {
            nodes {
              name
            }
          }
          featuredImage {
            node {
              mediaDetails {
                height
                width
              }
              localFile {
                childImageSharp {
                  fluid(quality: 90, maxWidth: 960) {
                    ...GatsbyImageSharpFluid_withWebp_noBase64
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
