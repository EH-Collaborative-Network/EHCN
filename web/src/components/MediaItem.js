import React from "react";
import { Figure } from "./figure";
import * as styles from "./css/carousel.module.css";
import ReactHtmlParser from 'react-html-parser';

const MediaItem = ({ media }) => {

let embed = media.embed;
let image = media.image;
let pdf = media.pdf;
console.log(media)
function lightboxed(e){
  let media = e.target.closest(".alice-carousel__stage-item > div").cloneNode(true);
  document.querySelector("#light-box .inner").innerHTML = ""
  document.querySelector("#light-box .inner").append(media)
  document.getElementById("light-box").classList.add("show");
}
  return(
    <div onClick={lightboxed}>
        {image &&
            <Figure node={image} />
        }
        {embed?.embed &&
          <div className={styles.embed}>{ReactHtmlParser(embed.embed)}<figcaption className="embed-caption">{embed.caption}</figcaption></div>
        }
        {pdf &&
          <div className={styles.pdf}>{ReactHtmlParser("<iframe src="+pdf.asset.url+"></iframe>")}<figcaption className="embed-caption">{pdf.caption}</figcaption></div>
        }
    </div>
  ) 
};

export default MediaItem;
