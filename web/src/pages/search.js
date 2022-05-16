import { useFlexSearch } from 'react-use-flexsearch'
import React from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import { useState } from 'react';
import Container from "../components/container";
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import BlockContent from "../components/block-content";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import TranslatedTitle from "../components/translatedTitle"
import { useEffect } from 'react';


export const query = graphql`
  query SearchPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
        title
        description
        keywords
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
            }
        }
    }
    items: localSearchItems {
        store
        index
    }
  }
`;

const Search = props => {
  const { data, errors } = props;
  const location = useLocation();

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const globalLanguages = site.languages;
  const languagePhrases = (data || {}).languagePhrases?.edges;
  const store = (data || {}).items.store
  const index = (data || {}).items.index
  const [query, setQuery] = useState(null);
  const results = useFlexSearch(query, index, store)
  
  useEffect(()=>{
    if(location?.search){
        let phrase = queryString.parse(location.search).query
        setQuery(phrase)
      }
  },[])

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }
  function handleSearch(e){
    let phrase = e.target.value;
    setQuery(phrase)
  }

  return (
      <>  
      <Layout extra='white' navTranslations={languagePhrases} globalLanguages={globalLanguages}>
        <SEO title={site.title} description={site.description} keywords={site.keywords} />
        <Container>
          <h1 hidden>Welcome to {site.title}</h1>
          <input type="text" onChange={handleSearch}/>
          {

              results.map(function(node,index){
                return(
                    <div key={index}>
                        <h1>{node.type}</h1>
                        <TranslatedTitle translations={node.titles}/>
                    </div>
                )
              })
          }
        </Container>
      </Layout>
      
    </>
  );
};

export default Search;
