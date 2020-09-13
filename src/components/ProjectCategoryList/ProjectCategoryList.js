import React from 'react';
import { Link } from 'gatsby';
import styles from './ProjectCategoryList.module.scss';
import BackgroundImage from 'gatsby-background-image';

const ProjectCategoryList = ({ projects }) => {
  if (projects.length === 0) {
    return <p>No projects in this category</p>;
  }

  return (
    <div className={styles.grid}>
      {projects.map(({ node: { id, title, featured_media, path } }) => {
        const { height, width } = featured_media.media_details;
        return (
          <BackgroundImage
            key={id}
            Tag="div"
            className={[
              styles.bg,
              height > width ? styles.portrait : styles.landscape,
            ].join(' ')}
            fluid={featured_media.localFile.childImageSharp.fluid}
            backgroundColor={`#040e18`}
          >
            <Link to={path}>
              <div dangerouslySetInnerHTML={{ __html: title }} />
            </Link>
          </BackgroundImage>
        );
      })}
    </div>
  );
};

export default ProjectCategoryList;
