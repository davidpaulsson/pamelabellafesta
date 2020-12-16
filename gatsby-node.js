const path = require('path');

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      categories: allWpCategory {
        nodes {
          id
          slug
        }
      }
      projects: allWpPost {
        nodes {
          id
          uri
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const posts = result.data.projects.nodes;
    posts.forEach(({ uri, id }) => {
      createPage({
        path: uri,
        component: path.resolve('src/templates/project-page.js'),
        context: { id },
      });
    });

    const categories = result.data.categories.nodes;
    categories.forEach(({ slug, id }) => {
      createPage({
        path: slug,
        component: path.resolve('src/templates/project-category-page.js'),
        context: { id },
      });
    });

    createPage({
      path: '/',
      component: path.resolve('src/templates/index-page.js'),
    });

    return Promise.resolve();
  });
};
