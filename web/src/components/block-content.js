import { PortableText } from "@portabletext/react";
import React, { useState } from "react";
import LangContext from './context/lang.js'
import { Figure } from "./figure";
import { Link } from "gatsby";
import { node } from "prop-types";
import TranslatedPhrase from "./translatedPhrase.js";

const serializers = {
  types: {
    figure: Figure
  },
  marks: {
    link: ({ mark, children }) => {
      const { blank, href } = mark;
      return blank ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          style={{ textDecoration: 'underline' }}
        >
          {children}
        </a>
      ) : (
        <a href={href} style={{ textDecoration: 'underline' }}>
          {children}
        </a>
      );
    },
    internalLink: ({ mark, children }) => {
      const { slug = {} } = mark;
      const href = `/${slug.current}`;
      return (
        <a href={href} style={{ textDecoration: 'underline' }}>
          {children}
        </a>
      );
    },
  },
};

const components = {
  marks:{
    internalLink: ({value, children}) => {
      const target = "/" + value?.reference?.slug.current
      return (
        <Link to={target}>
          {children}
        </Link>
      )
    },
  }
}

const BlockContent = ({ blocks, globalLanguages, languagePhrases }) => {
  const [adhoc, setAdhoc] = useState(null);
  let language ='';
  let defaultLangs = [];
  let adhocLangs = [];
  globalLanguages?.map(function(node,index){
    defaultLangs.push(node.code)
  })
  return(
    <LangContext.Consumer>
    { theme => {
      let translation = []

      console.log(globalLanguages)
      let lang = theme.lang;
      if(blocks){
        let unfilteredLangs = []
        /*Adhoc translations */
        blocks.forEach(element => {
          if(!defaultLangs.includes(element.language.code)){
            unfilteredLangs.push(element)
          }
        })
        unfilteredLangs.forEach(node=>{
          if(!adhocLangs.includes(node)){
            adhocLangs.push(node)
          }
        })
        if(lang){
          blocks.forEach(element => {
            if(element.language.code == lang){
              language = element.language.name
              if(element._rawText){
                translation = element._rawText
              }else if(element.text){
                translation = element.text
              }else{
                translation = ""
              }
              
            }
            
          });
        } else {
          blocks.forEach(element => {
            if(element.language.name == "English"){
              language = "English"
              translation = element._rawText
            }
            
          });
        }

        if(translation.length < 1){
          blocks.forEach(element => {
            if(element.language.name == "English"){
              translation = element._rawText
            }

          });
        }
      }
      console.log(adhocLangs)
      function handler(code){
        if(!code){
          setAdhoc(null)
        }
        blocks.map(function(node,index){
      
          if(node.language.code == code){
            setAdhoc(node._rawText)
          }
        })
      }

      return(
        <>
        <PortableText value={adhoc ? adhoc : translation} components={components} serializers={serializers} />
        { adhocLangs.map(function(node, index){
          return(<div onClick={()=>handler(node.language.code)}>{node.language.name}</div>)
        })
        }
        {(adhocLangs.length > 0) &&
          <div onClick={()=>handler(lang)}><TranslatedPhrase translations={languagePhrases} phrase={"availableIn"}/>{" "+language}</div>

        }
        </>
      )
    }}
    </LangContext.Consumer>
  )
};

export default BlockContent;
