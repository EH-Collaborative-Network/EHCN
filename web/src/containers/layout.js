import { graphql, StaticQuery } from "gatsby";
import React, { useState } from "react";
import Layout from "../components/Layout/layout";
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import LangContext from '../components/context/lang.js'

const query = graphql`
  query SiteTitleQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
    }
  }
`;

function LayoutContainer(props) {
  const location = useLocation();

  let lang = "en"
  if(location?.search){
    lang = queryString.parse(location.search).lang
    lang = lang ? lang : "en";
  }

  return (
    <StaticQuery
      query={query}
      render={data => {
        if (!data.site) {
          throw new Error(
            'Missing "Site settings". Open the studio at http://localhost:3333 and add "Site settings" data'
          );
        }
        return (
          <LangContext.Consumer>
            {theme => {
      
              return(
                <div id='global-wrapper' className={`${props.extra ? props.extra : ""}`}>
                <Layout
                  {...props}
                  lang={lang}
                  siteTitle={data.site.title}
                />
                </div>
              )}}
          </LangContext.Consumer>
        );
      }}
    />
  );
}

export default LayoutContainer;
