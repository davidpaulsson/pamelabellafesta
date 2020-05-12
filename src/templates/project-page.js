import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';

export const ProjectPageTemplate = ({ title, html }) => (
  <>
    <h2>{title}</h2>
    <div dangerouslySetInnerHTML={{ __html: html }} />
  </>
);

const ProjectPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark;

  return (
    <Layout>
      <ProjectPageTemplate title={frontmatter.title} html={html} />
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
      }
      html
    }
  }
`;
