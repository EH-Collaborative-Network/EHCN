import React from "react";
import "../../styles/layout.css";
import Modal from "../Modal/modal";
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
