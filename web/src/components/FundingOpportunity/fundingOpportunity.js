import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { getGatsbyImageData } from "gatsby-source-sanity";
import clientConfig from "../../../client-config";
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
