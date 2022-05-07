import { PortableText } from "@portabletext/react";
import React from "react";
import LangContext from './context/lang.js'
import { Figure } from "./figure";
import { Link } from "gatsby";

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

const BlockContent = ({ blocks }) => {
  


  return(
    <LangContext.Consumer>
    { theme => {
      let translation = []


      let lang = theme.lang;
      if(blocks){
 

        if(lang){
          blocks.forEach(element => {
            if(element.language.code == lang){
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
      return(
        <PortableText value={translation} components={components} serializers={serializers} />
      )
    }}
    </LangContext.Consumer>
  )
};

export default BlockContent;
