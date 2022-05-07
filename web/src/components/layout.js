import React from "react";
import Navigation from "./navigation";
import PropTypes from 'prop-types'
import "../styles/layout.css";
import * as styles from "./css/layout.module.css";
import Lightbox from "./lightbox";
const Layout = ({ children, onHideNav, onShowNav, showNav, siteTitle, navTranslations, globalLanguages }) =>{

  
  return(
    

      <>
        <Navigation siteTitle={siteTitle} globalLanguages={globalLanguages} onHideNav={onHideNav} translations={navTranslations} onShowNav={onShowNav} showNav={showNav} />
        <div className={styles.content}>{children}</div>
        <Lightbox/>
      </>

    
  );
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout;
