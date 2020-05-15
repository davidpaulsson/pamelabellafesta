import React from 'react';
import { Link } from 'gatsby';
import Img from '../components/PreviewCompatibleImage';

const ProjectCategoryList = ({ projects }) => {
  if (projects.length === 0) {
    return <p>No projects in this category</p>;
  }

  return (
    <>
      {projects.map(
        ({
          node: {
            frontmatter: { title, category, featuredImage },
            fields: { slug },
          },
        }) => {
          return (
            <Link
              key={featuredImage.id}
              to={
                '/' +
                String(category).toLowerCase() +
                slug.replace('projects/', '')
              }
            >
              <Img imageInfo={featuredImage} alt={title} />
            </Link>
          );
        },
      )}
    </>
  );
};

export default ProjectCategoryList;
