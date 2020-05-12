import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';

export const ProjectCategoryPageTemplate = ({ title }) => (
  <div>[ProjectCategoryPageTemplate] {title}</div>
);

const ProjectCategoryPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <ProjectCategoryPageTemplate title={frontmatter.title} />
    </Layout>
  );
};

export default ProjectCategoryPage;

export const pageQuery = graphql`
  query ProjectCategoryPageTemplateByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`;
