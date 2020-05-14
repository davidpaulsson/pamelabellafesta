import { graphql } from 'gatsby';
import React from 'react';
import Layout from '../components/Layout';
import styles from './information-page.module.scss';

import remark from 'remark';
import recommended from 'remark-preset-lint-recommended';
import remarkHtml from 'remark-html';

const mdToHtml = (md) =>
  remark().use(recommended).use(remarkHtml).processSync(md).toString();

export const InformationPageTemplate = ({
  bio,
  clients,
  contact,
  representation,
}) => {
  console.log({ contact });

  return (
    <>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Bio</h3>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: mdToHtml(bio) }}
        />
      </div>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Clients</h3>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: mdToHtml(clients) }}
        />
      </div>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Contact</h3>
        <div className={styles.content}>
          {contact.map(({ title, text, link }) => (
            <>
              <h4>{title}</h4>
              <ul>
                <li>
                  <a href={link}>{text}</a>
                </li>
              </ul>
            </>
          ))}
        </div>
      </div>
      contact
    </>
  );
};

const InformationPage = ({ data, location }) => {
  const {
    frontmatter: { bio, clients, contact, representation },
  } = data.markdownRemark;

  return (
    <Layout title="Information" {...{ location }}>
      <InformationPageTemplate
        {...{
          bio,
          clients,
          contact,
          representation,
        }}
      />
    </Layout>
  );
};

export default InformationPage;

export const pageQuery = graphql`
  query InformationPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "information-page" } }) {
      frontmatter {
        bio
        clients
        contact {
          title
          text
          link
        }
        representation
      }
    }
  }
`;
