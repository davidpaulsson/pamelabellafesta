import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';

export const InformationPageTemplate = ({ title }) => (
  <div>[InformationPageTemplate] {title}</div>
);

const InformationPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout title="Information">
      <InformationPageTemplate title={frontmatter.title} />
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
    }
  }
`;
