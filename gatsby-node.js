const path = require('path');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      categories: allWordpressCategory {
        edges {
          node {
            id
            slug
          }
        }
      }
      projects: allWordpressPost {
        edges {
          node {
            id
            path
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const posts = result.data.projects.edges;
    posts.forEach(({ node }) => {
      createPage({
        path: node.path,
        component: path.resolve(`src/templates/project-page.js`),
        context: { id: node.id },
      });
    });

    const categories = result.data.categories.edges;
    categories.forEach(({ node }) => {
      createPage({
        path: node.slug,
        component: path.resolve(`src/templates/project-category-page.js`),
        context: { id: node.id },
      });
    });

    createPage({
      path: '/',
      component: path.resolve(`src/templates/index-page.js`),
    });
  });
};
