import { graphql, Link, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import React, { useEffect } from 'react';
import styles from './RelatedProjects.module.scss';
import './tippy.css';

const RelatedProject = ({
  linkSlug, category, title, featuredMedia,
}) => (
  <li
    className={styles.listItem}
  >
    <Link to={linkSlug}>
      <span>{category}</span>
      <span dangerouslySetInnerHTML={{ __html: title }} />
    </Link>
    <div className={styles.preview}>
      <div className={styles.previewImageWrapper}>
        <Img className={styles.previewImage} fluid={featuredMedia} loading="eager" />
      </div>
    </div>
  </li>

);

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
  `);

  const relatedProjects = data.projects.edges.filter(
    ({ node }) => node.categories[0].name === currentProject.category
      && node.title !== currentProject.title,
  );

  if (relatedProjects.length === 0) {
    return null;
  }

  useEffect(() => {
    document.querySelectorAll('.tippy-popper').forEach((e) => e.remove());
  }, []);

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <h3>Browse more</h3>
        </li>
        {relatedProjects.map(({ node }) => (
          <RelatedProject
            key={node.id}
            linkSlug={node.path}
            category={currentProject.category}
            title={node.title}
            featuredMedia={node.featured_media.localFile.childImageSharp.fluid}
          />
        ))}
      </ul>
    </nav>
  );
};

export default RelatedProjects;
