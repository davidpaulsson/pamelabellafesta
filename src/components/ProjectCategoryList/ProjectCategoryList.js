import React from 'react';
import { Link } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import _ from 'lodash';
import styles from './ProjectCategoryList.module.scss';

const ProjectCategoryList = ({ projects }) => {
  if (projects.length === 0) {
    return <p>No projects in this category</p>;
  }

  return (
    <div className={styles.grid}>
      {projects
        .filter(({ node }) => _.has(
          node,
          'featured_media.localFile.childImageSharp.fluid',
        ))
        .map(({
          node: {
            // eslint-disable-next-line camelcase
            id, title, featured_media, path,
          },
        }) => {
          const { height, width } = featured_media.media_details;
          return (
            <BackgroundImage
              key={id}
              Tag="div"
              className={[
                styles.bg,
                height > width ? styles.portrait : styles.landscape,
              ].join(' ')}
              backgroundColor="#fefefe"
              fluid={featured_media.localFile.childImageSharp.fluid}
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
