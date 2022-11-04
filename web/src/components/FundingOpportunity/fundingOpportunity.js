import React from "react";
import BlockContent from "../TranslationHelpers/block-content";
import * as styles from "./fundingopp.module.css";
import TranslatedPhrase from "../TranslationHelpers/translatedPhrase";
import TranslatedTitle from "../TranslationHelpers/translatedTitle";

export function FundingOpportunity({languagePhrases, globalLanguages, key, node, institute }) {

  return (
    <div key={key} className={styles.root}>
      <h5><TranslatedTitle translations={node.titles} /></h5>
      <BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={node.descriptions}/>
      {node.applications.map(function(app, index){
        if(institute && institute != 'all'){
          if(institute == app.partner?.name){
            return <a className="button" key={index} href={app.url}><TranslatedPhrase phrase={'application'} translations={languagePhrases}/></a>;
          }
        }else{
           return <a className="button" key={index} href={app.url}><TranslatedPhrase phrase={'application'} translations={languagePhrases}/></a>;
        }
      })}
    </div>
  );
}
