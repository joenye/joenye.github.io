import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import Seo from "../components/Seo";

const BookReviewTemplate = ({ data }) => {
  const book = data.markdownRemark;
  const siteTitle = data.site.siteMetadata?.title || `Title`;

  return (
    <Layout title={`${siteTitle}'s Reading 📚`}>
      <Seo
        title={book.frontmatter.title}
        description={book.frontmatter.title}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h4 style={{ marginBottom: '15px' }} itemProp="headline">{book.frontmatter.title}</h4>
        </header>
        <h6 style={{ marginTop: '0px' }}>by {book.frontmatter.author}</h6>
        <section
          dangerouslySetInnerHTML={{ __html: book.html }}
          itemProp="articleBody"
        />
        <hr/>
        <br />
        <div>Rating: {book.frontmatter.rating}/5</div>
        {[...Array(Number(book.frontmatter.rating)).keys()].map((_) => (
          <span role="img" aria-label="star" style={{ fontSize: "1.2rem" }}>
            ⭐
          </span>
        ))}
        <br />
        <br />
        <i>Reviewed {book.frontmatter.reviewDate}</i>
      </article>
    </Layout>
  );
};

export default BookReviewTemplate;

export const pageQuery = graphql`
  query BookReviewBySlug($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "DD MMMMM, YYYY")
        title
        author
        yearRead
        reviewDate(formatString: "DD MMMM, YYYY")
        rating
      }
    }
  }
`;
