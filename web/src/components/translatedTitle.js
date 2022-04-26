import React from "react";

const TranslatedTitle = ({ translations }) => {
  let translation = []
  if(translations){
    translations.forEach(element => {
      if(element.language.name == "English"){
        translation = element.text
      }
    });
  }


  return(
  <h1>{translation}</h1>
  )
};

export default TranslatedTitle;
