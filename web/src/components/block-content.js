import { PortableText } from "@portabletext/react";
import React from "react";

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
  let translation = []


  let lang;
  if(blocks){
    if(lang){
      blocks.forEach(element => {
        if(element.language.name == lang){
          translation = element._rawText
        }
      });
    } else {
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
};

export default BlockContent;
