import React from 'react';
import { Link } from 'gatsby';
import Img from '../../components/PreviewCompatibleImage';
import styles from './ProjectCategoryList.module.scss';
import BackgroundImage from 'gatsby-background-image';

const ProjectCategoryList = ({ projects }) => {
  if (projects.length === 0) {
    return <p>No projects in this category</p>;
  }

  return (
    <div className={styles.grid}>
      {projects.map(
        ({
          node: {
            id,
            frontmatter: { title, category, featuredImage },
            fields: { slug },
          },
        }) => {
          const { height, width } = featuredImage.childImageSharp.original;
          return (
            <Link
              key={id}
              to={
                '/' +
                String(category).toLowerCase() +
                slug.replace('projects/', '')
              }
              className={height > width ? styles.portrait : styles.landscape}
            >
              <BackgroundImage
                Tag="section"
                className={styles.bg}
                fluid={featuredImage.childImageSharp.fluid}
                backgroundColor={`#040e18`}
              />
            </Link>
          );
        },
      )}
    </div>
  );
};

export default ProjectCategoryList;
