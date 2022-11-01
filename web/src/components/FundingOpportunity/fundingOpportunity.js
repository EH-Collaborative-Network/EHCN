import React from "react";
import BlockContent from "../TranslationHelpers/block-content";
import * as styles from "./fundingopp.module.css";

export function FundingOpportunity({languagePhrases, globalLanguages, key, node, institute }) {

  return (
    <div key={key} className={styles.root}>
      <h5>{node.title}</h5>
      <BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={node.descriptions}/>
      {node.applications.map(function(app, index){
        if(institute && institute != 'all'){
          if(institute == app.partner?.name){
            return <a className="button" key={index} href={app.url}>{app.text + " "+""}</a>;
          }
        }else{
           return <a className="button" key={index} href={app.url}>{app.text + " "+""}</a>;
        }
      })}
    </div>
  );
}
