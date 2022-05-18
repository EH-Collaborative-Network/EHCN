import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { getGatsbyImageData } from "gatsby-source-sanity";
import clientConfig from "../../../client-config";
import BlockContent from "../TranslationHelpers/block-content";
import * as styles from "./fundingopp.module.css";

export function FundingOpportunity({ key, node }) {

  return (
    <div key={key} className={styles.root}>
      <h5>{node.title}</h5>
      <BlockContent blocks={node.descriptions}/>
      {node.applications.map(function(app, index){
            return <a className="button" key={index} href={app.url}>{app.text + " "+"→"}</a>;
      })}
    </div>
  );
}
