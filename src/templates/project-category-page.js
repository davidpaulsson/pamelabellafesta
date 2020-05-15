import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';
import ProjectCategoryList from '../components/ProjectCategoryList';

export const ProjectCategoryPageTemplate = ({ projects }) => (
  <ProjectCategoryList {...{ projects }} />
);

const ProjectCategoryPage = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout title={frontmatter.category} {...{ location }}>
      <ProjectCategoryPageTemplate projects={data.projects.edges} />
    </Layout>
  );
};

export default ProjectCategoryPage;

export const pageQuery = graphql`
  query ProjectCategoryPageTemplateByID($id: String!, $category: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        category
      }
    }
    projects: allMarkdownRemark(
      filter: {
        frontmatter: {
          category: { eq: $category }
          templateKey: { eq: "project-page" }
        }
      }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date
            category
            featuredImage {
              id
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid_withWebp
                }
                original {
                  height
                  width
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
