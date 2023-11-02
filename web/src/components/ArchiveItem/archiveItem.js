import React from "react";
import TranslatedTitle from "../TranslationHelpers/translatedTitle";
import { Figure } from "../Figure/figure";
import * as styles from "./archive.module.css";
import { Link } from "@reach/router";

const ArchiveItem = ({titles, link, image, key}) => {



  return(
    <div key={key} className={styles.root}>
                <Link to={link}>
                    {
                        image &&
                        <Figure normal={true} node={image} />  
                    }
                  
 
                
                <span><TranslatedTitle translations={titles}/></span>
                </Link>
    </div>
  )

};

export default ArchiveItem;
