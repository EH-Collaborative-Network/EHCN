import React from "react";
import Navigation from "./navigation";

import "../styles/layout.css";
import * as styles from "./css/layout.module.css";

const Layout = ({ children, onHideNav, onShowNav, showNav, siteTitle }) => (
  <>
    <Navigation siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} />
    <div className={styles.content}>{children}</div>

  </>
);

export default Layout;
