import React from 'react';
import { Link } from 'gatsby';

const ProjectCategoryList = ({ projects }) => {
  if (projects.length === 0) {
    return <p>No projects in this category</p>;
  }
  return (
    <>
      <p>Projects:</p>
      <ul>
        {projects.map(({ node }) => {
          const {
            id,
            frontmatter: { category, title },
            fields: { slug },
          } = node;

          return (
            <li key={id}>
              <Link
                to={
                  '/' +
                  String(category).toLowerCase() +
                  slug.replace('projects/', '')
                }
              >
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ProjectCategoryList;
