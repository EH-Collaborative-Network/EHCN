import { Link } from "gatsby";
import React from "react";
import { createContext, useState, useContext, useMemo } from 'react';
import logo from '../assets/logo.png'; 
import osun from '../assets/osun.png';
import * as styles from "./css/header.module.css";
import LangContext from './context/lang.js'
import TranslatedPhrase from "./translatedPhrase";

const Navigation = ({ onHideNav, onShowNav, showNav, siteTitle, translations, globalLanguages }) =>{
  let defaultLang = "en";
  const [language, setLanguage] = useState(defaultLang);
  // let handler = (event) => {
  //   let value = event.target.value
  //   localStorage.setItem("lang", JSON.stringify(value))
  //   setLanguage(value)
  console.log(globalLanguages)
  // }
  return (
 
    <div className={styles.header}>
      <div className={styles.logo}><Link to="/"><img alt={"EHCN's logo which has an abstracted 'E' in the shape of the E.H. building on Bard campus with a grey H inside of it. Alongside this, is the text Experimental Humanities Collaborative Network."} src={logo} /></Link></div>
      <div className={styles.wrapper}>  
      <LangContext.Consumer>
    { theme => {
      
      return(
        <ul className={styles.menu}>
      
            <li><Link to="/about/"><TranslatedPhrase translations={translations} phrase={"aboutEHCN"}/>→</Link></li>
            <li><Link to="/funding"><TranslatedPhrase translations={translations} phrase={"fundingOpportunities"}/>→</Link></li>
            <li><Link to="/researchthreads/"><TranslatedPhrase translations={translations} phrase={"researchThreads"}/>→</Link></li>
            <li><Link to="/calendar/"><TranslatedPhrase translations={translations} phrase={"calendar"}/>→</Link></li>
            <li><Link to="/learningresources/"><TranslatedPhrase translations={translations} phrase={"learningResources"}/>→</Link></li>
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
        <div className={styles.langWrapper}>
          <svg className={styles.globe} width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.4781 14.8786C28.4781 22.2473 22.2355 28.2571 14.4891 28.2571C6.74262 28.2571 0.5 22.2473 0.5 14.8786C0.5 7.50986 6.74262 1.5 14.4891 1.5C22.2355 1.5 28.4781 7.50986 28.4781 14.8786Z" stroke="#333333"/>
            <line x1="1.95117" y1="20.9238" x2="27.0853" y2="20.9238" stroke="#333333"/>
            <line x1="0.236328" y1="14.9492" x2="28.9188" y2="14.9492" stroke="#333333"/>
            <line x1="1.53711" y1="8.59375" x2="27.44" y2="8.59375" stroke="#333333"/>
            <path d="M14.5785 1.35352C13.0507 1.64322 9.97158 4.83538 9.87695 15.2864" stroke="#333333"/>
            <path d="M14.5785 1.35352C13.0507 1.64322 9.97158 4.83538 9.87695 15.2864" stroke="#333333"/>
            <path d="M14.6081 28.377C13.0707 28.1048 9.97217 25.1055 9.87695 15.286" stroke="#333333"/>
            <path d="M14.6074 28.377C15.9142 28.1048 18.548 25.1055 18.6289 15.286" stroke="#333333"/>
            <path d="M14.6074 1.32617C15.9142 1.61644 18.548 4.81482 18.6289 15.2862" stroke="#333333"/>
            <path d="M14.6375 28.431C12.41 27.9693 7.90669 25.7445 5.7371 21.2609C4.55428 18.8165 4.49513 15.2314 4.55432 15.2858" stroke="#333333"/>
            <path d="M14.6675 1.32511C12.4367 1.81542 7.92709 4.17803 5.75442 8.93933C4.56993 11.5351 4.51069 15.3422 4.56996 15.2845" stroke="#333333"/>
            <path d="M14.6664 28.4304C16.8058 27.9687 21.1309 25.744 23.2146 21.2606C24.3506 18.8164 24.4074 15.2314 24.3506 15.2858" stroke="#333333"/>
            <path d="M14.6664 1.32511C16.8058 1.81542 21.1309 4.17803 23.2146 8.93933C24.3506 11.5351 24.4074 15.3422 24.3506 15.2845" stroke="#333333"/>
          </svg>

          <select className={styles.lang} onChange={handler} name="lang" id="lang">
            {/* <option style={{"display":"none"}} selected>Select language</option> */}
           { globalLanguages.map(function(language, index){
              return(<option key={index} value={language.code} selected={language.code == theme.lang}>{language.name}</option>)
            })}
            
          </select> 
        </div>
      )}}
     </LangContext.Consumer>
        <ul className={styles.menu}>
          <li><TranslatedPhrase translations={translations} phrase={"ehcnSupported"}/></li>
          <li><img className={styles.osun} src={osun}/></li>
        </ul>
      </div>
    </div>

)};

export default Navigation;
