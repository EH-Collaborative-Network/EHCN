import React from "react";
import Navigation from "./navigation";
import PropTypes from 'prop-types'
import "../styles/layout.css";
import * as styles from "./css/modal.module.css";
import BlockContent from "./block-content";

const Modal = ({ content,name }) =>{
    function handler(e){
        let el = e.target.closest(".modal")
        el.classList.remove("show");
    }
    return(
        <div className={styles.modal + " " + "modal"}>
            <div className={styles.close} onClick={handler}>
              <svg width="54" height="57" viewBox="0 0 54 57" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="73.4602" height="3.45354" rx="1.72677" transform="matrix(0.698084 0.716016 -0.698084 0.716016 2.61719 0.69043)" fill="#333333"/>
              <rect width="73.4602" height="3.52472" rx="1.76236" transform="matrix(0.698084 -0.716016 0.698084 0.716016 0 53.6006)" fill="#333333"/>
              </svg>
            </div>
            <div className={styles.inner}>
                <h4>{name}</h4>
                {content &&
                    <BlockContent blocks={content}/>
                }
                {!content &&
                    <span>Coming soon...</span>
                }
            </div>
        </div>
    );
  }
  
  
  export default Modal;
  