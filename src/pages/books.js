import React from "react";
import Img from "gatsby-image";
import { Link, graphql } from "gatsby";

import Layout from "../components/Layout";
import Seo from "../components/Seo";

const BooksIndexPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title;
  const books = data.allMarkdownRemark.edges.map((edge) => edge.node);

  return (
    <Layout title={`${siteTitle}'s Reading 📚`}>
      <Seo title="All blog posts" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, 200px)",
          gridGap: "20px",
        }}
      >
        {books.map((book) => {
          const title = book.frontmatter.title || book.fields.slug;
          const coverImgFixed =
            book.frontmatter.coverImage.childImageSharp.fixed;

          return (
            <article
              itemScope
              itemType="http://schema.org/Article"
              style={{ maxWidth: "250px" }}
            >
              <Link
                to={`/books${book.fields.slug}`}
                itemProp="url"
                className="post-list-item-title"
              >
                <Img fixed={coverImgFixed} />
              </Link>
              <div
                style={{
                  height: "100px",
                  position: "relative",
                }}
              >
              <Link
                to={`/books${book.fields.slug}`}
                itemProp="url"
                className="post-list-item-title"
              >
                <span itemProp="headline">{title}</span>
              </Link>
                <div style={{ position: "absolute", bottom: 0, left: 0 }}>
                  {book.frontmatter.author}
                  <br />
                  {[...Array(Number(book.frontmatter.rating)).keys()].map(
                    (_) => (
                      <span role="img" aria-label="star">
                        ⭐
                      </span>
                    )
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Layout>
  );
};

export default BooksIndexPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: {
        fields: [
          frontmatter___yearRead
          frontmatter___rating
          frontmatter___title
        ]
        order: [DESC, DESC, ASC]
      }
      filter: { fileAbsolutePath: { regex: "/books/" } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM YYYY")
            title
            author
            yearRead
            rating
            coverImage {
              childImageSharp {
                fixed(width: 176, height: 224, quality: 100) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`;
