import { AnimatePresence, motion } from 'framer-motion';
import { graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image/compat';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import useInterval from '../hooks/useInterval';
import useWindowSize from '../hooks/useWindowSize';
import styles from './index-page.module.scss';

const IndexPageTemplate = ({ projects }) => {
  const { width } = useWindowSize();

  const [isMobile, setIsMobile] = useState(width < 768);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  useEffect(() => {
    setIsMobile(width < 768);
  }, [width, setIsMobile]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  useInterval(() => {
    if (isMobile) {
      let idx = selectedProjectIndex + 1;
      if (idx >= projects.edges.length) {
        idx = 0;
      }
      setSelectedProjectIndex(idx);
    }
  }, 2000);

  if (!isMobile) {
    return (
      <div className={styles.grid}>
        <div className={styles.projectInfo}>
          <div className={styles.category}>
            {projects.edges[selectedProjectIndex].node.categories.nodes[0].name}
          </div>
          <div
            className={styles.title}
            dangerouslySetInnerHTML={{
              __html: projects.edges[selectedProjectIndex].node.title,
            }}
          />
        </div>

        {projects.edges.map((proj, index) => (
          <div
            className={styles.img}
            key={proj.node.id}
            style={{ opacity: selectedProjectIndex === index ? 1 : 0 }}
          >
            <GatsbyImage
              loading="eager"
              style={{
                height: '100vh',
                width: '100%',
              }}
              fluid={proj.node.featuredImage.node.localFile.childImageSharp.fluid}
            />
          </div>
        ))}

        <div className={styles.gallery}>
          {projects.edges.map((proj, index) => (
            <Link
              to={proj.node.uri}
              className={styles.box}
              onMouseEnter={() => setSelectedProjectIndex(index)}
              key={proj.node.id}
            />
          ))}
        </div>

      </div>
    );
  }

  const { node } = projects.edges[selectedProjectIndex];

  return (
    <div style={{ position: 'relative' }}>
      <AnimatePresence>
        <motion.div
          style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
          }}
          key={selectedProjectIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Link to={node.uri}>
            <GatsbyImage fluid={node.featuredImage.node.localFile.childImageSharp.fluid} />
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const IndexPage = ({ data, location }) => {
  const { projects } = data;

  return (
    <Layout {...{ location }}>
      <IndexPageTemplate {...{ projects }} />
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPage {
    projects: allWpPost(
      sort: { fields: date, order: DESC }, 
      limit: 10
    ) {
      edges {
        node {
          id
          title
          uri
          categories {
            nodes {
              name
            }
          }
          featuredImage {
            node {
              mediaDetails {
                height
                width
              }
              localFile {
                childImageSharp {
                  fluid(quality: 80, maxWidth: 1440) {
                    ...GatsbyImageSharpFluid_withWebp_noBase64
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
