import React from "react";
import { useFlexSearch } from 'react-use-flexsearch'
import { graphql } from "gatsby";
import translate from "../components/TranslationHelpers/translate";
import LangContext from '../components/context/lang';
import Container from "../components/Container/container";
import BlockContent from "../components/TranslationHelpers/block-content";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { useState } from 'react';
import TranslatedPhrase from "../components/TranslationHelpers/translatedPhrase";
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle";
import { Link } from "@reach/router";
import * as styles from "../components/LearningResource/resource.module.css";

export const query = graphql`
  query ResourcesPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
      showMarquee
      marqueeText{
        _rawText(resolveReferences: { maxDepth: 20 })
        language{
          id
          code
          name
        }
      }
      languages {
        name
        code
      }
    }
    languagePhrases: allSanityLanguage {
      edges {
        node {
          name
          code
          aboutEHCN
          calendar
          fundingOpportunities
          ehcnSupported
          learningResources
          researchThreads
          availableIn
          learningResource
          featured
          search
          results
          noResults
        }
      }
    }
    opps: allSanityOpportunity{
        edges{
            node {
                applications {
                  text
                  url
                  partner {
                    name
                    slug {
                      current
                    }
                  }
                }
                institution
                title
                id
                descriptions{
                  _rawText
                  language{
                    id
                    code
                    name
                  }
                }
              }
        }
    }
    items: localSearchItems {
      store
      index
    }
    resources: allSanityLearningResource(
      limit: 60
      filter: { slug: { current: { ne: null } }}
    ) {
      edges {
        node {
          id
          name
          featured
          slug{
            current
          }
          titles{
            text
            language{
              id
              name
              code
            }
          }
          descriptions{
            _rawText
            language{
              id
              code
              name
            }
          }
        }
      }
    }
  }
`;

const LearningResources = props => {
  const { data, errors } = props;
  const languagePhrases = (data || {}).languagePhrases?.edges;
  const resources = (data || {}).resources?.edges;
  const store = (data || {}).items.store
  const index = (data || {}).items.index
  const [query, setQuery] = useState(null);
  const results = useFlexSearch(query, index, store)
  let filteredResults = [];
  results?.map(function(node, index){
    if(node.type == "learningResource"){
      filteredResults.push(node)
    }
  })
  function handleSearch(e){
    let el = e.target;
    let parent = el.closest("div");
    let phrase = parent.querySelector("input").value
    setQuery(phrase)
  }
  function handleEnter(e){
    if(e.key == "Enter"){
      let el = e.target;
      let parent = el.closest("div");
      let phrase = parent.querySelector("input").value
      setQuery(phrase)
    }
  }
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const globalLanguages = site.languages;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  return (
      <>  
      <Layout extra="" navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={site.showMarquee} marqueeContent={site.marqueeText}>
        <SEO title={site.title} description={site.description} keywords={site.keywords} />
        <Container>
          <h1 hidden>Welcome to {site.title}</h1>
          <h1><TranslatedPhrase translations={languagePhrases} phrase={"learningResources"}/></h1>
          <div className={styles.searchWrapper}>
          <LangContext.Consumer>
            {theme => {
                    return(
                    <input type="text" onKeyDown={handleEnter} placeholder={translate(languagePhrases, "search", theme) + " " + translate(languagePhrases, "learningResources", theme)} />
                )}}
          </LangContext.Consumer>
          <button onClick={handleSearch}>
              <svg width="31" height="29" viewBox="0 0 31 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.0023 11.2C22.0023 16.4901 17.4814 20.9 11.7511 20.9C6.02087 20.9 1.5 16.4901 1.5 11.2C1.5 5.90992 6.02087 1.5 11.7511 1.5C17.4814 1.5 22.0023 5.90992 22.0023 11.2Z" stroke="#333333" stroke-width="3"/>
              <path d="M27.9786 27.9995C28.5976 28.5501 29.5453 28.4943 30.0955 27.8749C30.6456 27.2556 30.5898 26.3071 29.9709 25.7565L27.9786 27.9995ZM17.9062 19.0395L27.9786 27.9995L29.9709 25.7565L19.8985 16.7965L17.9062 19.0395Z" fill="#333333"/>
              </svg>
          </button>
          </div>
          {filteredResults.length == 0 &&
          <div id="featured" className={styles.wrapper + " show"}>
          {(query?.length > 0 && filteredResults.length == 0) &&
            <em id="no-results"><TranslatedPhrase translations={languagePhrases} phrase={"noResults"}/> "{query}"</em>
          }
          <em><TranslatedPhrase translations={languagePhrases} phrase={"featured"}/> <TranslatedPhrase translations={languagePhrases} phrase={"learningResources"}/>:</em>
          {resources.map(function(node, index){

            if(node.node.featured){
              return(
                <div className={styles.root}>
                  <Link to={"learning-resource/"+node.node.slug?.current}>
                    <TranslatedTitle translations={node.node.titles}/>
                    <BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={node.node.descriptions}/>
                    <Link className="button" to={"learning-resource/"+node.node.slug?.current}>See More→</Link>
                  </Link>
                </div>
              )
            }
          })}
          </div>
          }
          { filteredResults.length > 0 &&
          <div id="results" className={styles.wrapper + " "}>
          <em><TranslatedPhrase translations={languagePhrases} phrase={"search"}/> <TranslatedPhrase translations={languagePhrases} phrase={"results"}/>:</em>
          {filteredResults.map(function(node, index){
            
          
              return(
                <div className={styles.root}>
                  <Link to={"learning-resource/"+node.slug?.current}>
                    <TranslatedTitle translations={node.titles}/>
                    <BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={node.descriptions}/>
                    <Link className="button" to={"learning-resource/"+node.slug?.current}>See More→</Link>
                  </Link>
                </div>
              )
            
          })}
          </div>
          }
        </Container>
      </Layout>
      
    </>
  );
};

export default LearningResources;
