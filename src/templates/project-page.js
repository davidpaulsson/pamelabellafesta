import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';

export const ProjectPageTemplate = ({ title }) => (
  <div>[ProjectPageTemplate] {title}</div>
);

const ProjectPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <ProjectPageTemplate title={frontmatter.title} />
    </Layout>
  );
};

export default ProjectPage;

export const pageQuery = graphql`
  query ProjectPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "project-page" } }) {
      frontmatter {
        title
      }
    }
  }
`;
