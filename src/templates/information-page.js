import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';
import styles from './information-page.module.scss';
import ReactMarkdown from 'react-markdown';
export const InformationPageTemplate = ({
  title,
  bio,
  clients,
  phone,
  email,
  instagram,
  representation,
}) => {
  console.log({ title, bio, clients, phone, email, instagram, representation });

  return (
    <>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Bio</h3>
        <ReactMarkdown className={styles.content} source={bio} />
      </div>

      <div className={styles.wrapper}>
        <h3 className={styles.title}>Clients</h3>
        <ReactMarkdown className={styles.content} source={clients} />
      </div>
    </>
  );
};

const InformationPage = ({ data, location }) => {
  const {
    frontmatter: {
      title,
      bio,
      clients,
      phone,
      email,
      instagram,
      representation,
    },
  } = data.markdownRemark;

  return (
    <Layout title="Information" {...{ location }}>
      <InformationPageTemplate
        {...{ title, bio, clients, phone, email, instagram, representation }}
      />
    </Layout>
  );
};

export default InformationPage;

export const pageQuery = graphql`
  query InformationPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "information-page" } }) {
      frontmatter {
        title
        bio
        clients
        phone
        email
        instagram
        representation
      }
    }
  }
`;
