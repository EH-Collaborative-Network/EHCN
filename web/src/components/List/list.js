import React, {useState,useEffect}  from "react";
import * as styles from "./list.module.css";
import MediaItem from "../MediaItem/mediaItem";
import { Figure } from "../Figure/figure";
import TranslatedTitle from "../TranslationHelpers/translatedTitle";
import { Link } from "@reach/router";

const List = ({ media }) => {
    let medias = media.map(function(node, index){
        let title = node[1];
        let url = node[2]
        return <Link to={url}><span><TranslatedTitle translations={title}/></span></Link>;
    })
return(
    <div className={styles.root}>{medias}</div>
)

}

export default List