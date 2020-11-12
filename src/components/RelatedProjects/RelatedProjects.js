import React, { useState } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import { Tooltip } from 'react-tippy';
import styles from './RelatedProjects.module.scss';
import './tippy.css';

const RelatedProject = ({
  linkSlug, category, title, featuredMedia,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <li
        className={styles.listItem}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Tooltip
          position="right-end"
          open={isOpen}
          theme="transparent"
          animation="none"
          html={(
            <Link to={linkSlug} className={styles.preview}>
              <Img fluid={featuredMedia} className={styles.previewImage} />
            </Link>
          )}
        >
          <Link to={linkSlug}>
            <span>{category}</span>
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </Link>
        </Tooltip>
      </li>
    </>
  );
};

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
                  fluid(quality: 75, maxWidth: 1024) {
                    ...GatsbyImageSharpFluid_withWebp
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
