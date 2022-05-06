import React from "react";
import { Figure } from "./figure";
import * as styles from "./css/carousel.module.css";

const MediaItem = ({ media }) => {

let embed = media.embed;
let image = media.image;
let pdf = media.pdf;

function lightboxed(e){
  let media = e.target.cloneNode(true)
  document.querySelector("#light-box .inner").innerHTML = ""
  document.querySelector("#light-box .inner").append(media)
  document.getElementById("light-box").classList.add("show");
}
  return(
    <div onClick={lightboxed}>
        {image &&
            <Figure node={image} />
        }

    </div>
  ) 
};

export default MediaItem;
