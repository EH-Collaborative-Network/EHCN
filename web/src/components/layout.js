import React from "react";
import Navigation from "./navigation";
import PropTypes from 'prop-types'
import "../styles/layout.css";
import * as styles from "./css/layout.module.css";
import Lightbox from "./lightbox";
import Marquee from "./marquee";
const Layout = ({ children, siteTitle, navTranslations, globalLanguages, showMarquee, marqueeContent }) =>{

  
  return(
    

      <>
        <Navigation siteTitle={siteTitle} globalLanguages={globalLanguages} translations={navTranslations} />
        <div className={styles.content}>{children}</div>
        {showMarquee &&
          <Marquee marqueeContent={marqueeContent} languagePhrases={navTranslations} globalLanguages={globalLanguages}/>
        }
        <Lightbox/>
      </>

    
  );
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout;
