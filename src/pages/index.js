import React from "react";
import { Link, graphql } from "gatsby";

import Seo from "../components/Seo";
import Layout from "../components/Layout";

const BlogIndexPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges.map((edge) => edge.node);

  return (
    <Layout title={`${siteTitle}'s Blog 📝`}>
      <Seo title="All blog posts" />
      <ol style={{ listStyle: `none` }}>
        {posts.map((post) => {
          const title = post.frontmatter.title || post.fields.slug;

          return (
            <li key={`/posts${post.fields.slug}`}>
              <article itemScope itemType="http://schema.org/Article">
                <span className="post-list-item-date">
                  {post.frontmatter.date}
                </span>
                <Link
                  to={`/posts${post.fields.slug}`}
                  itemProp="url"
                  className="post-list-item-title"
                >
                  <span itemProp="headline">{title}</span>
                </Link>
              </article>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export default BlogIndexPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/posts/" } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM YYYY")
            title
            description
          }
        }
      }
    }
  }
`;
