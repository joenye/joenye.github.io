import React from "react";
import { Link } from "gatsby";

const Layout = ({ title, children }) => {
  let header;

  header = (
    <>
      <h1 className="main-heading">{title}</h1>
      <div style={{ display: "flex" }}>
        <Link to="/" itemProp="url" className="post-list-item-title">
          Blog
        </Link>
        <div style={{ marginLeft: "10px", marginRight: "10px" }}>·</div>
        <Link to="/books" itemProp="url" className="post-list-item-title">
          Reading
        </Link>
      </div>
      <hr />
    </>
  );

  return (
    <div className="global-wrapper">
      <header className="global-header">{header}</header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
