import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';

export const InformationPageTemplate = ({ title, html }) => (
  <>
    <h2>{title}</h2>
    <div dangerouslySetInnerHTML={{ __html: html }} />
  </>
);

const InformationPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark;

  return (
    <Layout title="Information">
      <InformationPageTemplate title={frontmatter.title} html={html} />
    </Layout>
  );
};

export default InformationPage;

export const pageQuery = graphql`
  query InformationPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "information-page" } }) {
      frontmatter {
        title
      }
      html
    }
  }
`;
