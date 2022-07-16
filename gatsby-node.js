//Add regex to GraphQL query to match URLs in the navigation JSON
exports.onCreateNode = async ({
  node,
  loadNodeContent,
  actions: { createNode, createParentChildLink },
  createNodeId,
  createContentDigest,
}) => {
  if (node.internal.type !== "nav") return;

  const iterateTree = async (node, parent) => {
    const child = {
      ...node,
      id: createNodeId(node.href),
      children: [],
      parent: (parent && parent.id) || null,
      internal: {
        type: "NavItem",
        contentDigest: createContentDigest(node),
        description: node.href,
      },
    };
    await createNode(child);
    parent && createParentChildLink({ parent, child });
    if (child.links) {
      for (const grand of child.links) iterateTree(grand, child);
    }
  };

  try {
    const nodeContent = await loadNodeContent(node);
    const arr = JSON.parse(nodeContent);
    await iterateTree(arr, null);
  } catch (error) {
    console.error(error);
  }
};

//Add optional fields to GraphQL
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
      type nav implements Node {
        style: String
        class: String
      }
      type NavItem implements Node {
        style: String
        class: String
      }
    `;
  createTypes(typeDefs);
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  deletePage(page);
  const regex = page.context.path__alias
    ? `/^${page.context.path__alias.replace(/\//g, "/")}\/?$/i`
    : "/^/$/";
  return createPage({
    ...page,
    context: {
      ...page.context,
      regex,
    },
  });
};
