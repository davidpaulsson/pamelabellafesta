import React, { useState } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styles from './RelatedProjects.module.scss';
import Img from 'gatsby-image';

const RelatedProjects = ({ currentProject }) => {
  const data = useStaticQuery(graphql`
    query AllProjects {
      projects: allWordpressPost(sort: { order: DESC, fields: date }) {
        edges {
          node {
            id
            title
            categories {
              name
            }
            path
            featured_media {
              localFile {
                childImageSharp {
                  fluid(quality: 95, maxWidth: 1200) {
                    ...GatsbyImageSharpFluid_withWebp_noBase64
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  const [hover, setHover] = useState(null);

  const relatedProjects = data.projects.edges.filter(
    ({ node }) =>
      node.categories[0].name === currentProject.category &&
      node.title !== currentProject.title,
  );

  if (relatedProjects.length === 0) {
    return null;
  }

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <h3>Browse more</h3>
        </li>
        {relatedProjects.map(({ node }) => (
          <li
            className={styles.listItem}
            key={node.id}
            onMouseEnter={() => setHover(node)}
            onMouseLeave={() => setHover(null)}
          >
            <Link to={node.path}>
              <span>{currentProject.category}</span>
              <span dangerouslySetInnerHTML={{ __html: node.title }} />
            </Link>
          </li>
        ))}
        <div className={styles.preview}>
          <div className={styles.previewImage}>
            {hover && (
              <Img
                fluid={hover?.featured_media.localFile.childImageSharp.fluid}
              />
            )}
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default RelatedProjects;
