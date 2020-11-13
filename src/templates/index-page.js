import { graphql, Link } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import Img from 'gatsby-image';
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from '../components/Layout';
import useInterval from '../hooks/useInterval';
import useWindowSize from '../hooks/useWindowSize';
import styles from './index-page.module.scss';

const IndexPageTemplate = ({ projects }) => {
  const { width } = useWindowSize();

  const [isMobile, setIsMobile] = useState(width < 768);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    setIsMobile(width < 768);
  }, [width, setIsMobile]);

  useEffect(() => {
    setTimeout(() => {
      setShowImages(true);
    }, 500);
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
            {projects.edges[selectedProjectIndex].node.categories[0].name}
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
            <BackgroundImage
              style={{
                height: '100vh',
                width: '100%',
                backgroundPosition: 'top center',
              }}
              backgroundColor="#fefefe"
              fluid={proj.node.featured_media.localFile.childImageSharp.fluid}
            />
          </div>
        ))}

        {showImages && (
          <div className={styles.gallery}>
            {projects.edges.map((proj, index) => (
              <Link
                to={proj.node.path}
                className={styles.box}
                onMouseEnter={() => setSelectedProjectIndex(index)}
                key={proj.node.id}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  const { node } = projects.edges[selectedProjectIndex];

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={selectedProjectIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Link to={node.path}>
          <Img fluid={node.featured_media.localFile.childImageSharp.fluid} />
        </Link>
      </motion.div>
    </AnimatePresence>
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
    projects: allWordpressPost(sort: { order: DESC, fields: date }, limit: 10) {
      edges {
        node {
          id
          title
          path
          categories {
            name
          }
          featured_media {
            media_details {
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
`;
