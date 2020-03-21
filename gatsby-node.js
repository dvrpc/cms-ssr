const path = require("path");
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const template = path.resolve(`src/templates/App.js`);
  // Query for recipe nodes to use in creating pages.
  return graphql(`
    {
      allNodePage {
        edges {
          node {
            path {
              alias
            }
            body {
              processed
              summary
            }
            relationships {
              field_staff_contact {
                name
                field_display_name
                field_title
              }
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    // Create pages for each node.
    result.data.allNodePage.edges.forEach(({ node }) => {
      node.path.alias &&
        createPage({
          path: node.path.alias,
          component: template,
          context: { slug: node.path.alias }
        });
    });
  });
};

exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
  const config = getConfig();
  if (stage.startsWith("develop") && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "react-dom": "@hot-loader/react-dom"
    };
  }
};
