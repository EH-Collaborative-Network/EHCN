import React from "react";
import Navigation from "./navigation";
import PropTypes from 'prop-types'
import "../styles/layout.css";
import * as styles from "./css/modal.module.css";
import Modal from "./modal";
const Person = ({ person, index }) =>{
  function handler(e){
    let el = e.target.closest("li");
    
    if(!el.querySelector(".modal").classList.contains("show")){
        el.querySelector(".modal").classList.add('show');
    }
    
  }

  return(
      <li key={index}>
          <div onClick={handler} className="button">{person.node.name + "→"}</div>
          <Modal name={person.node.name} content={person.node.bios} />
      </li> 
  );
}


export default Person;
