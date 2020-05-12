import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';
import ProjectCategoryList from '../components/ProjectCategoryList';

export const ProjectCategoryPageTemplate = ({ category, projects }) => (
  <>
    <h2>{category}</h2>
    <ProjectCategoryList {...{ projects }} />
  </>
);

const ProjectCategoryPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <ProjectCategoryPageTemplate
        category={frontmatter.category}
        projects={data.projects.edges}
      />
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
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            category
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
