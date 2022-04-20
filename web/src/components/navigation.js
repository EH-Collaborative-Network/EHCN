import { Link } from "gatsby";
import React from "react";

// import * as styles from "./css/header.module.css";

const Navigation = ({ onHideNav, onShowNav, showNav, siteTitle }) => (
  <div className="header">
      <div className="EHCN-logo"><img src=""/></div>
      <ul>
          <li><Link to="/about/">About</Link></li>
          <li><Link to="/funding">Funding Opportunities</Link></li>
          <li><Link to="/researchthreads/">Research Threads</Link></li>
          <li><Link to="/calendar/">Calendar</Link></li>
          <li><Link to="/learningresources/">Learning Resources</Link></li>
      </ul>
  </div>
);

export default Navigation;
