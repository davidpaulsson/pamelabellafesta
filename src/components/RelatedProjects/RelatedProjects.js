import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styles from './RelatedProjects.module.scss';

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
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  // const []

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
          <li className={styles.listItem} key={node.id}>
            <Link to={node.path}>
              <span>{currentProject.category}</span>
              <span dangerouslySetInnerHTML={{ __html: node.title }} />
            </Link>
          </li>
        ))}
        <div className={styles.preview}>
          <div className={styles.previewImage}>test</div>
        </div>
      </ul>
    </nav>
  );
};

export default RelatedProjects;
