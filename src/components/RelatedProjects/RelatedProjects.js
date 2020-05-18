import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styles from './RelatedProjects.module.scss';

const RelatedProjects = ({ currentProject }) => {
  const data = useStaticQuery(graphql`
    query AllProjects {
      projects: allMarkdownRemark(
        sort: { fields: frontmatter___title, order: DESC }
        filter: { frontmatter: { templateKey: { eq: "project-page" } } }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              category
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const relatedProjects = data.projects.edges.filter(
    ({ node }) =>
      node.frontmatter.category === currentProject.category &&
      node.frontmatter.title !== currentProject.title,
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
          <li className={styles.listItem}>
            <a
              href={node.fields.slug.replace(
                'projects',
                node.frontmatter.category.toLowerCase(),
              )}
            >
              <span>{currentProject.category}</span>
              <span>{node.frontmatter.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default RelatedProjects;
