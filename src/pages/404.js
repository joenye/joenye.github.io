import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import Seo from "../components/Seo";

const NotFoundPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout title={siteTitle}>
      <Seo title="404: Not Found" />
      <h1>404: Not Found</h1>
    </Layout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
