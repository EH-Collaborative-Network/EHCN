import { Link } from "gatsby";
import React from "react";
import { createContext, useState, useContext, useMemo } from 'react';
import logo from '../assets/logo.png'; 
import osun from '../assets/osun.png';
import * as styles from "./css/header.module.css";
import LangContext from './context/lang.js'

const Navigation = ({ onHideNav, onShowNav, showNav, siteTitle }) =>{
  let defaultLang = "en";
  const [language, setLanguage] = useState(defaultLang);
  // let handler = (event) => {
  //   let value = event.target.value
  //   localStorage.setItem("lang", JSON.stringify(value))
  //   setLanguage(value)
  // }
  return (
 
    <div className={styles.header}>
      <div className={styles.logo}><Link to="/"><img alt={"EHCN's logo which has an abstracted 'E' in the shape of the E.H. building on Bard campus with a grey H inside of it. Alongside this, is the text Experimental Humanities Collaborative Network."} src={logo} /></Link></div>
      <div className={styles.wrapper}>  
      <LangContext.Consumer>
    { theme => {
      
      return(
        <ul className={styles.menu}>
      
            <li><Link to="/about/">{theme.lang == "en" ? "About EHCN→" : "Sobre EHCN"} {theme.lang}</Link></li>
            <li><Link to="/funding">Funding Opportunities→</Link></li>
            <li><Link to="/researchthreads/">Research Threads→</Link></li>
            <li><Link to="/calendar/">Calendar→</Link></li>
            <li><Link to="/learningresources/">Learning Resources→</Link></li>
        </ul>
        )
    }}
    </LangContext.Consumer>
    <LangContext.Consumer>
    {theme => {
      let handler = (event) => {
        let value = event.target.value
        localStorage.setItem("lang", JSON.stringify(value))
        theme.setLang(value)
      }
      return(
        <ul>

  
  
                <li>
                  <label htmlFor="lang">Select language:</label>
                  <select onChange={handler} name="lang" id="lang">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                  </select>
                </li>

      
          
        </ul>
      )}}
     </LangContext.Consumer>
        <ul className={styles.menu}>
          <li><img className={styles.osun} src={osun}/></li>
        </ul>
      </div>
    </div>

)};

export default Navigation;
