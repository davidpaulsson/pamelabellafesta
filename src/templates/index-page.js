import { graphql, Link } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import styles from './index-page.module.scss';

export const IndexPageTemplate = ({ title, html, projects }) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  return (
    <div className={styles.grid}>
      <div className={styles.projectInfo}>
        <div className={styles.category}>
          {projects.edges[selectedProjectIndex].node.frontmatter.category}
        </div>
        <div className={styles.title}>
          {projects.edges[selectedProjectIndex].node.frontmatter.title}
        </div>
      </div>
      {projects.edges.map((proj, index) => {
        return (
          <div
            className={styles.img}
            key={proj.node.frontmatter.featuredImage.id}
            style={{ opacity: selectedProjectIndex === index ? 1 : 0 }}
          >
            <BackgroundImage
              style={{ height: '100vh', width: '100%' }}
              fluid={proj.node.frontmatter.featuredImage.childImageSharp.fluid}
            />
          </div>
        );
      })}
      <div className={styles.gallery}>
        {projects.edges.map((proj, index) => {
          return (
            <Link
              to={proj.node.fields.slug.replace(
                'projects',
                proj.node.frontmatter.category.toLowerCase(),
              )}
              className={styles.box}
              onMouseEnter={() => setSelectedProjectIndex(index)}
              key={proj.node.frontmatter.featuredImage.id}
            />
          );
        })}
      </div>
    </div>
  );
};

const IndexPage = ({ data, location }) => {
  const {
    projects,
    markdownRemark: {
      frontmatter: { title },
      html,
    },
  } = data;

  return (
    <Layout {...{ location }}>
      <IndexPageTemplate {...{ title, html, projects }} />
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
    projects: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { templateKey: { eq: "project-page" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            category
            featuredImage {
              id
              childImageSharp {
                fluid(maxWidth: 1600, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
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
