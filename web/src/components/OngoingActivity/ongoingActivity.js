import React from "react";
import TranslatedTitle from "../TranslationHelpers/translatedTitle";
import { Figure } from "../Figure/figure";
import * as styles from "./ongoingActivity.module.css";
import { Link } from "@reach/router";
import BlockContent from "../TranslationHelpers/block-content";
import DisplayTime from "../Time/displayTime";


const OngoingActivity = ({titles, descriptions, languagePhrases, globalLanguages, image, node, offset, key}) => {
   


  return(
    <div key={key} className={styles.root}>

      <div className={styles.titleArea}>
      {
          image &&
          <Figure normal={true} node={image} />  
      }
      <span className={styles.title}><TranslatedTitle translations={titles}/>
      
      {(node.timeZone && node.startDate) &&
             <span> <DisplayTime event={node} offset={offset} languagePhrases={languagePhrases}/></span>
            }</span>
      </div>

      
      <div><BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={descriptions}/></div>
      {node.mainLink?.text?.length > 0 &&
                  <div className={'main-link '+ styles.ml}><a className="blue-button" target="_blank" href={node.mainLink.url}>{node.mainLink.text}</a></div>
        }
    </div>
  )

};

export default OngoingActivity;
