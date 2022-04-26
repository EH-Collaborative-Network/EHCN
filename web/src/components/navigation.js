import { Link } from "gatsby";
import React from "react";
import logo from '../assets/logo.png'; 
import osun from '../assets/osun.png';
import * as styles from "./css/header.module.css";

const Navigation = ({ onHideNav, onShowNav, showNav, siteTitle }) => (
  <div className={styles.header}>
    <div className={styles.logo}><Link to="/"><img alt={"EHCN's logo which has an abstracted 'E' in the shape of the E.H. building on Bard campus with a grey H inside of it. Alongside this, is the text Experimental Humanities Collaborative Network."} src={logo} /></Link></div>
    <div className={styles.wrapper}>
      <ul className={styles.menu}>
          <li><Link to="/about/">About EHCN→</Link></li>
          <li><Link to="/funding">Funding Opportunities→</Link></li>
          <li><Link to="/researchthreads/">Research Threads→</Link></li>
          <li><Link to="/calendar/">Calendar→</Link></li>
          <li><Link to="/learningresources/">Learning Resources→</Link></li>
      </ul>
      <ul className={styles.menu}>
        <li><img className={styles.osun} src={osun}/></li>
      </ul>
    </div>
  </div>
);

export default Navigation;
