import { graphql } from 'gatsby';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import BackgroundImage from 'gatsby-background-image';
import Img from 'gatsby-image';
import _ from 'lodash';
import styles from './index-page.module.scss';

export const IndexPageTemplate = ({ title, html, projects }) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  return (
    <>
      <BackgroundImage
        className={styles.gallery}
        fluid={
          projects.edges[selectedProjectIndex].node.frontmatter.featuredImage
            .childImageSharp.fluid
        }
      >
        {projects.edges.map((proj, index) => {
          return (
            <div
              className={styles.box}
              onMouseEnter={() => setSelectedProjectIndex(index)}
              key={proj.node.frontmatter.featuredImage.id}
            />
          );
        })}
      </BackgroundImage>
    </>
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
                  ...GatsbyImageSharpFluid
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
