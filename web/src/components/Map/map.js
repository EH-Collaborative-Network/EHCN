import React from "react";
import map from "./map.png"
import tbn from "./tbn.png"
import generator from "./generator.png"
import { useState } from 'react';
import * as styles from "./map.module.css";
import { Link } from "@reach/router";
import TranslatedPhrase from "../TranslationHelpers/translatedPhrase";
const Map = ({partners,phrase, translations}) => {
  const [cp, setCP] = useState(0);
const hoverLabel = (label) =>{
  let el = document.querySelector("."+label);
  el.style.display = "inline-block"
}
const leaveLabel = (label) =>{
  let el = document.querySelector("."+label)
  el.style.display = "none"
}

const nextCP = () => {
  if(cp == 1){
    setCP(0)
  }else{
    setCP(cp + 1)
  }
}
const previousCP = () => {
  if(cp == 0){
    setCP(1)
  }else{
    setCP(cp - 1)
  }
}
  return (
    <div>
      <div className={styles.root}>
        <h4>Featured Cross-Network Projects</h4>
        <div className={styles.inner}>
        <div className={styles.mapWrapper}>
          <img src={map}/>
          <div className={styles.nodes}>
            {cp == 0 &&
            <svg viewBox="0 0 599 413" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M411.5 156L457 168.5L139.5 125.5L148.5 124H362L519.5 45.5L411.5 156Z" stroke="#BF0B3E" stroke-width="3"/>
            </svg>   
            }
            {cp == 1 &&
            <svg viewBox="0 0 599 413" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M135 131.5L39 37L387.5 111L362.5 124.5L135 131.5Z" stroke="#BF0B3E" stroke-width="3"/>
            </svg>
            
            }
            <svg viewBox="0 0 599 413" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse onMouseLeave={() => leaveLabel("Palestine-label")} onMouseEnter={() => hoverLabel("Palestine-label")} className={cp == 0 ? styles.active + " Palestine" : "Palestine"} cx="456.28" cy="167.899" rx="4.44067" ry="4.29084" fill="#333333"/>
            <ellipse onMouseLeave={() => leaveLabel("Bishkek-label")} onMouseEnter={() => hoverLabel("Bishkek-label")} className={cp == 0 ? styles.active + " Bishkek": "Bishkek"} cx="519.559" cy="46.683" rx="4.44067" ry="4.29084" fill="#333333"/>
            <ellipse onMouseLeave={() => leaveLabel("Thessaly-label")} onMouseEnter={() => hoverLabel("Thessaly-label")} className={cp == 0 ? styles.active + " Thessaly" : "Thessaly"} cx="411.873" cy="156.099" rx="4.44067" ry="4.29084" fill="#333333"/>
            <ellipse onMouseLeave={() => leaveLabel("Vienna-label")} onMouseEnter={() => hoverLabel("Vienna-label")} className={" Vienna"} cx="375.238" cy="131.427" rx="4.44067" ry="4.29084" fill="#333333"/>
            <ellipse onMouseLeave={() => leaveLabel("Vilnius-label")} onMouseEnter={() => hoverLabel("Vilnius-label")} className={cp == 1 ? styles.active + " Vilnius": "Vilnius"} cx="386.339" cy="112.118" rx="4.44067" ry="4.29084" fill="#333333"/>
            <ellipse onMouseLeave={() => leaveLabel("Berlin-label")} onMouseEnter={() => hoverLabel("Berlin-label")} className={cp == 0 || cp == 1 ? styles.active + " Berlin": "Berlin"} cx="361.915" cy="124.991" rx="4.44067" ry="4.29084" fill="#333333"/>
            <ellipse onMouseLeave={() => leaveLabel("London-label")} onMouseEnter={() => hoverLabel("London-label")} className={" London"} cx="340.823" cy="127.136" rx="4.44067" ry="4.29084" fill="#333333"/>
            <ellipse onMouseLeave={() => leaveLabel("NewYork-label")} onMouseEnter={() => hoverLabel("NewYork-label")} className={cp == 0 ? styles.active + " NewYork": "NewYork"} cx="148.763" cy="124.991" rx="4.44067" ry="4.29084" fill="#333333"/>
            <ellipse onMouseLeave={() => leaveLabel("DC-label")} onMouseEnter={() => hoverLabel("DC-label")} className={cp == 0 ? styles.active + " DC": "DC"} cx="139.881" cy="124.991" rx="4.44067" ry="4.29084" fill="#333333"/>
            <ellipse onMouseLeave={() => leaveLabel("Virginia-label")} onMouseEnter={() => hoverLabel("Virginia-label")} className={cp == 1 ? styles.active + " Virginia": "Virginia"} cx="135.441" cy="131.427" rx="4.44067" ry="4.29084" fill="#333333"/>
            <ellipse onMouseLeave={() => leaveLabel("Bogota-label")} onMouseEnter={() => hoverLabel("Bogota-label")} className={" Bogota"} cx="93.2551" cy="255.862" rx="4.44067" ry="4.29084" fill="#333333"/>
            <ellipse onMouseLeave={() => leaveLabel("Arizona-label")} onMouseEnter={() => hoverLabel("Arizona-label")} className={cp == 1 ? styles.active + " Arizona": "Arizona"} cx="38.8567" cy="37.0286" rx="4.44067" ry="4.29084" fill="#333333"/>
            </svg>
            
          </div>
          <div className={styles.labels}>
            <Link to={"/partner/alquds-bard-college"} className={"Palestine-label"}>Al Quds Bard, Palestine</Link>
            <Link to={"/partner/american-university-of-central-asia"} className={"Bishkek-label"}>American University of Central Asia, Kyrgyzstan</Link>
            <Link to={"/partner/university-of-thessaly"} className={"Thessaly-label"}>University of Thessaly, Greece</Link>
            <Link to={"/partner/central-european-university"} className={"Vienna-label"}>Central European University, Hungary/Austria</Link>
            <Link to={"/partner/european-humanities-university"} className={"Vilnius-label"}>European Humanities University, Lithuania</Link>
            <Link to={"/partner/bard-berlin"} className={"Berlin-label"}>Bard College Berlin, Germany</Link>
            <Link to={"/partner/birkbeck-college"} className={"London-label"}>Birkbeck College at the University of London, UK</Link>
            <Link to={"/partner/bard-annandale"} className={"NewYork-label"}>Bard College Annandale, USA</Link>
            <Link to={"/partner/recovering-voices"} className={"DC-label"}>Recovering Voices, Smithsonian Institution, USA</Link>
            <Link to={"/partner/hampton-university"} className={"Virginia-label"}>Hampton University, USA</Link>
            <Link to={"/partner/universidad-de-los-andes"} className={"Bogota-label"}>Universidad de Los Andes, Colombia</Link>
            <Link to={"/partner/arizona-state-university"} className={"Arizona-label"}>Arizona State University, USA</Link>
          </div>
        </div>
        <div className={styles.projectWrapper}>
          {cp == 0 &&
          <div className={styles.projectInner}>
            <Link className="blue-button" to={"/project/to-be-named"}>View Project</Link>
            <div className={styles.imgWrapper}><img src={tbn}/></div>
            <span><strong>To Be—Named</strong> is a multi-site, new media art exhibition & edited volume.</span>
          </div>
          }
          {cp == 1 &&
          <div className={styles.projectInner}>
            <Link className="blue-button" to={"/project/generator-project"}>View Project</Link>
            <div className={styles.imgWrapper}><img src={generator}/></div>
            <span><strong>The Generator Project:</strong> Imagining a More Just Future for Energy Creation</span>
          </div>
          }
          
        </div>
        </div>
        <div onClick={previousCP} className={styles.arrowButtonLeft}><svg width="14" height="21" viewBox="0 0 14 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 1L2 10.88L13 20" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div onClick={nextCP} className={styles.arrowButtonRight}><svg width="14" height="21" viewBox="0 0 14 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 20L12 10.12L1 1" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
      </div>
  )
};

export default Map;


