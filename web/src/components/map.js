import sketch from "./utils/sketchMap";
import { ReactP5Wrapper } from "react-p5-wrapper";
import React from "react";
import * as styles from "./css/map.module.css";
import { Link } from "@reach/router";
import TranslatedPhrase from "./translatedPhrase";
const Map = ({partners,phrase, translations}) => {
  return (
      <div className={styles.root}>
        <ReactP5Wrapper sketch={sketch} />
        <div className={styles.partners}>
          <h4><TranslatedPhrase phrase={phrase} translations={translations}/>:</h4>
          <ul>
          {partners?.map(function(partner, index){
            return(
              <li><Link to={partner.node.slug.current}>{partner.node.name + "→"}</Link></li>
            )
          })}
          </ul>
        </div>
      </div>
  )
};

export default Map;


