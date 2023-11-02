import React from "react";
import "../../styles/layout.css";
import * as styles from "./modal.module.css";
import BlockContent from "../TranslationHelpers/block-content";
import TranslatedTitle from "../TranslationHelpers/translatedTitle";
import { Figure } from "../Figure/figure";
const Modal = ({ content,name,image, raw,start }) =>{
    function handler(e){
        let el = e.target.closest(".modal")
        el.classList.remove("show");
        let bg = el.closest(".modalWrapper").querySelector(".modal-bg")
        bg.classList.remove("show")
        
    }
    function bgHandler(e){
        console.log(e.target)
        let el = e.target.closest(".modalWrapper")
        el = el.querySelector(".modal")
        el.classList.remove("show");
        let bg = el.closest(".modalWrapper").querySelector(".modal-bg")
        bg.classList.remove("show")
    }
    return(
        <div className={styles.modalWrapper + " modalWrapper"}>
        <div className={start ? styles.modal + " show " + "modal" : styles.modal + " " + "modal"}>
            <div className={styles.close} onClick={handler}>
              <svg  viewBox="0 0 54 57" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="73.4602" height="3.45354" rx="1.72677" transform="matrix(0.698084 0.716016 -0.698084 0.716016 2.61719 0.69043)" fill="#333333"/>
              <rect width="73.4602" height="3.52472" rx="1.76236" transform="matrix(0.698084 -0.716016 0.698084 0.716016 0 53.6006)" fill="#333333"/>
              </svg>
            </div>
            <div className={styles.inner}>
                {name &&
                    <h4>{name}</h4> 
                }
                {image &&
                    <Figure simple={true} node={image}/>
                }
                {content &&
                    <BlockContent blocks={content}/>
                }
                {raw &&
                   <> {raw}</>
                }         
                {(!content && !raw) &&
                    <span>Coming soon...</span>
                }
            </div>
            
        </div>

            <div onClick={bgHandler} className={start ? styles.bg + " modal-bg show" : styles.bg + " modal-bg"}></div>

        </div>
    );
  }
  
  
  export default Modal;
  