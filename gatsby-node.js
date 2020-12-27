const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const BlogPostTemplate = path.resolve(`./src/templates/BlogPostTemplate.js`);
  await createPages(graphql, reporter, createPage, "posts", BlogPostTemplate);

  const BookReviewTemplate = path.resolve(
    `./src/templates/BookReviewTemplate.js`
  );
  await createPages(graphql, reporter, createPage, "books", BookReviewTemplate);
};

async function createPages(
  graphql,
  reporter,
  createPage,
  sourceDir,
  component
) {
  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { fileAbsolutePath: { regex: "/${sourceDir}/" } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading MDX`, result.errors);
    return;
  }

  const posts = result.data.allMarkdownRemark.edges.map((edge) => edge.node);
  posts.forEach((post, index) => {
    const previousPostId = index === 0 ? null : posts[index - 1].id;
    const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id;

    createPage({
      path: `/${sourceDir}${post.fields.slug}`,
      component,
      context: {
        id: post.id,
        previousPostId,
        nextPostId,
      },
    });
  });
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
