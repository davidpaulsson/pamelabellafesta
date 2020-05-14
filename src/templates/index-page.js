import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';

export const IndexPageTemplate = ({ title, html }) => (
  <>
    <h2>{title}</h2>
    <div dangerouslySetInnerHTML={{ __html: html }} />
  </>
);

const IndexPage = ({ data, location }) => {
  const { frontmatter, html } = data.markdownRemark;

  return (
    <Layout {...{ location }}>
      <IndexPageTemplate title={frontmatter.title} html={html} />
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
      }
      html
    }
  }
`;
