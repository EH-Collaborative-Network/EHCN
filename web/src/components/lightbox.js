import React from "react";
// import MediaItem from "./MediaItem";
import * as styles from "./css/lightbox.module.css";

const Lightbox = ({ }) => {
  function handler(){
      document.getElementById("light-box").classList.remove("show");
  }
  return(
    <div id="light-box" className={styles.root}>
        <div onClick={handler} className={styles.inner}>
            <div className={styles.close} onClick={handler}>X</div>
            <div className={styles.inner + " "+"inner"}></div>
        </div>
    </div>
  )
};

export default Lightbox;
