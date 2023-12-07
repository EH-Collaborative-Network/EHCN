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
import { useState, useEffect } from 'react';
import TranslatedPhrase from "../components/TranslationHelpers/translatedPhrase";
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle";
import { Link } from "@reach/router";
import * as styles from "../components/LearningResource/resource.module.css";
import * as archiveStyles from "../components/ArchiveItem/archive.module.css";

export const query = graphql`
  query ResourcesPageQuery {
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
          events
          fundingOpportunities
          learningResources
          archive
          relatedPartners
          filters
          year
          medium
          theme
          availableIn
          newsletter
          learningResource
          search
          results
          noResults
        }
      }
    }
    partners: allSanityPartner{
      edges{
        node{
          id
          name
          slug{
            current
          }
        }
      }
    }
    themes: allSanityTheme{
      edges{
        node{
          id
          name
          titles{
            text
            language{
              id
              name
              code
            }
          }
        }
      }
    }
    mediums: allSanityMedium{
      edges{
        node{
          id
          name
          titles{
            text
            language{
              id
              name
              code
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
          _createdAt
          name
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
          partners{
            id
            name
          }
          themes{
            id
            name
          }
          mediums{
            id
            name
          }
          excerpts{
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
  const store = (data || {}).items?.store
  const index = (data || {}).items?.index
  const [query, setQuery] = useState(null);
  const results = index ? useFlexSearch(query, index, store) : []
  let filteredResults = [];
  resources.sort(function (a, b) {
    if (a.node._createdAt < b.node._createdAt) {
      return 1;
    }
    if (a.node._createdAt > b.node._createdAt) {
      return -1;
    }
    return 0;
  });
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
  const [partnerFilter, setPartnerFilter] = useState([]);
  const [mediumFilter, setMediumFilter] = useState([]);
  const [themeFilter, setThemeFilter] = useState([]);
  const partners = (data || {}).partners?.edges;
  const themes = (data || {}).themes?.edges;
  const mediums = (data || {}).mediums?.edges;
  const [yearFilter, setYearFilter] = useState("All");
  
  const accordion = (e) => {
    let el = e.target;
    if(!el.classList.contains("accordion")){
      el = el.closest(".accordion")
    }
    if(el.classList.contains("open")){
      el.classList.remove("open")
    }else{
      el.classList.add("open")
    }
  }
  const bigAccordion = (e) => {
    let el = e.target;
    
    if(!el.classList.contains("filterwrapper")){
      el = el.closest(".filterwrapper")
    }
    if(el.classList.contains("open")){
      el.classList.remove("open")
    }else{
      el.classList.add("open")
    }
  }
  let params = [];
  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }
/* Set currentFilter, currentMediums, currentLocation based on url params */
useEffect(() => {

  if(location?.search){
    if(location.search.split("?").length > 1 ){
      params = location.search.split("?")[1].split("&");
    }
    params.forEach((param) => {
      let p = param.split("=")[0];
      let v = param.split("=")[1];
      if(p == "mediums" ){
        let ve = v.split("%20").join(" ") //handle spaces
        ve.split(",").forEach((t,i)=>{
          let id = t.split(" ").join("-");
          document.querySelector("#medium-" + id).checked = true;
        })
        setMediumFilter(ve.split(','))
      }else if(p == "themes" ){
        let ve = v.split("%20").join(" ") //handle spaces
        ve.split(",").forEach((t,i)=>{
          let id = t.split(" ").join("-");
          document.querySelector("#theme-" + id).checked = true;
        })
        setThemeFilter(ve.split(','))
      }else if(p == "partners"){
        let ve = v.split("%20").join(" ") //handle spaces
        ve.split(",").forEach((t,i)=>{
          let id = t.split(" ").join("-");
          document.querySelector("#partner-" + id).checked = true;
        })
        setPartnerFilter(ve.split(','))
      }else if(p == "year"){
          setYearFilter(v)
       }
    })
  }
    }, []);

    let partnerDivs = [] 
    partners.forEach((node,i) => {
          partnerDivs.push(
              <div key={i}>
                <input onChange={handlePartner} value={node.node.name} id={"partner-"+ node.node.name.split(" ").join("-")} type={"checkbox"}></input>
                <label for={"partner-"+ node.node.name.split(" ").join("-")}>{node.node.name}</label>
              </div> 
          )
    })

    let themeDivs = [] 
  themes.forEach((node,i) => {
        themeDivs.push(
            <div key={i}>
              <input onChange={handleTheme} value={node.node.name} id={"theme-"+node.node.name.split(" ").join("-")} type={"checkbox"}></input>
              <label for={"theme-"+node.node.name.split(" ").join("-")}><TranslatedTitle translations={node.node.titles}/></label>
            </div> 
        )
  })

  let mediumDivs = [] 
  mediums.forEach((node,i) => {
        mediumDivs.push(
            <div key={i}>
              <input onChange={handleMedium} value={node.node.name} id={"medium-"+ node.node.name.split(" ").join("-")} type={"checkbox"}></input>
              <label for={"medium-"+ node.node.name.split(" ").join("-")}><TranslatedTitle translations={node.node.titles}/></label>
            </div> 
        )
  })
/* CHECK YEAR */ 

function handleYear(e){
  if(typeof window != `undefined`){
    let searchstring = window.location.search?.split("?")[1]
    let searchParams = [];
    //check param
    if(searchstring){
      let kv = searchstring.split("&");
      kv.forEach((k,i)=>{
        let newk = k.split("=");
        if(newk[0]!="year"){
          searchParams.push(newk.join("="))
        }
        
      })
    }
    
    let newSearchString = "?" + searchParams.join("&");
    newSearchString = newSearchString + "&year=" + e.target.value;
    

    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + newSearchString;
    window.history.pushState({path:newurl},'',newurl);
  }
  setYearFilter(e.target.value);
}
  /* CHECK PARTNER */ 
  function handlePartner(e){
    if(typeof window != `undefined`){

      let searchstring = window.location.search?.split("?")[1]
      let currentPartner = false;
      let searchParams = [];
      //check param
      if(searchstring){
        let kv = searchstring.split("&");
        kv.forEach((k,i)=>{
          let newk = k.split("=");
          if(newk[0]!="partners"){
            searchParams.push(newk.join("="))
          }else{
            currentPartner = newk[1].split(",")
          }
          
        })
      }
      if(currentPartner){
        const index = currentPartner.indexOf(e.target.value.split(" ").join("%20"));
        if (index > -1) { // only splice array when item is found
          currentPartner.splice(index, 1); // 2nd parameter means remove one item only
        }
      }else{
        currentPartner = []
      }
      


    let newSearchString;
    let arr = partnerFilter.slice(0);
    if(e.target.checked){
      newSearchString = "?" + searchParams.join("&");
      currentPartner.push(e.target.value.split(" ").join("%20"));
      if(currentPartner.length == 1){
        currentPartner = currentPartner[0]
      }else{
        currentPartner = currentPartner.join(",")
      } 
      newSearchString = newSearchString + "&partners=" + currentPartner;
      arr.push(e.target.value);
    }else{
      if(currentPartner.length == 1){
        currentPartner = currentPartner[0]
      }else{
        currentPartner = currentPartner.join(",")
      } 
      newSearchString = "?" + searchParams.join("&");
      if(currentPartner.length == 0){
        newSearchString = newSearchString;
      }else{
        newSearchString = newSearchString + "&partners=" + currentPartner;
      }
      const index = arr.indexOf(e.target.value);
      if (index > -1) { // only splice array when item is found
        arr.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + newSearchString;
    window.history.pushState({path:newurl},'',newurl);
    setPartnerFilter(arr);
    }
  }
/** CHECK MEDIUM */
  function handleMedium(e){
    if(typeof window != `undefined`){
      let searchstring = window.location.search?.split("?")[1]
      let currentMedium = false;
      let searchParams = [];
      //check param
      if(searchstring){
        let kv = searchstring.split("&");
        kv.forEach((k,i)=>{
          let newk = k.split("=");
          if(newk[0]!="mediums"){
            searchParams.push(newk.join("="))
          }else{
            currentMedium = newk[1].split(",")
          }
          
        })
      }
      if(currentMedium){
        const index = currentMedium.indexOf(e.target.value.split(" ").join("%20"));
        if (index > -1) { // only splice array when item is found
          currentMedium.splice(index, 1); // 2nd parameter means remove one item only
        }
      }else{
        currentMedium = []
      }
    let newSearchString;

    let arr = mediumFilter.slice(0);
    if(e.target.checked){
      newSearchString = "?" + searchParams.join("&");
      currentMedium.push(e.target.value.split(" ").join("%20"));
      if(currentMedium.length == 1){
        currentMedium = currentMedium[0]
      }else{
        currentMedium = currentMedium.join(",")
      } 
      newSearchString = newSearchString + "&mediums=" + currentMedium;
      arr.push(e.target.value);
    }else{
      if(currentMedium.length == 1){
        currentMedium = currentMedium[0]
      }else{
        currentMedium = currentMedium.join(",")
      } 
      newSearchString = "?" + searchParams.join("&");
      if(currentMedium.length == 0){
        newSearchString = newSearchString;
      }else{
        newSearchString = newSearchString + "&mediums=" + currentMedium;
      }

      const index = arr.indexOf(e.target.value);
      if (index > -1) { // only splice array when item is found
        arr.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + newSearchString;
    window.history.pushState({path:newurl},'',newurl);
    setMediumFilter(arr);
    }
  }
/* CHECK THEME */
  function handleTheme(e){
    if(typeof window != `undefined`){
      let searchstring = window.location.search?.split("?")[1]
      let currentTheme = false;
      let searchParams = [];
      //check param
      if(searchstring){
        let kv = searchstring.split("&");
        kv.forEach((k,i)=>{
          let newk = k.split("=");
          if(newk[0]!="themes"){
            searchParams.push(newk.join("="))
          }else{
            currentTheme = newk[1].split(",")
          }
          
        })
      }
      if(currentTheme){
        const index = currentTheme.indexOf(e.target.value.split(" ").join("%20"));
        if (index > -1) { // only splice array when item is found
          currentTheme.splice(index, 1); // 2nd parameter means remove one item only
        }
      }else{
        currentTheme = []
      }
    let newSearchString;
    let arr = themeFilter.slice(0);
    if(e.target.checked){
      newSearchString = "?" + searchParams.join("&");
      currentTheme.push(e.target.value.split(" ").join("%20"));
      if(currentTheme.length == 1){
        currentTheme = currentTheme[0]
      }else{
        currentTheme = currentTheme.join(",")
      } 
      newSearchString = newSearchString + "&themes=" + currentTheme;
      arr.push(e.target.value);
    }else{

      if(currentTheme.length == 1){
        currentTheme = currentTheme[0]
      }else{
        currentTheme = currentTheme.join(",")
      } 
      newSearchString = "?" + searchParams.join("&");
      if(currentTheme.length == 0){
        newSearchString = newSearchString;
      }else{
        newSearchString = newSearchString + "&themes=" + currentTheme;
      }
     
      const index = arr.indexOf(e.target.value);
      if (index > -1) { // only splice array when item is found
        arr.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + newSearchString;
    window.history.pushState({path:newurl},'',newurl);
    setThemeFilter(arr);
    }
  }



  return (
      <>  
      <Layout extra="" navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={false} marqueeContent={null}>
        <SEO title={site.title} description={site.description} keywords={site.keywords} />
        <Container>
          <h1 hidden>Welcome to {site.title}</h1>
          <h1><TranslatedPhrase translations={languagePhrases} phrase={"learningResources"}/></h1>
          <div><div className={styles.searchWrapper}>
          <LangContext.Consumer>
            {theme => {
                    return(
                    <input type="text" onKeyDown={handleEnter} placeholder={translate(languagePhrases, "search", theme) + " " + translate(languagePhrases, "learningResources", theme)} />
                )}}
          </LangContext.Consumer>
          <button onClick={handleSearch} aria-labelledby="search-label">
              <span id="search-label" hidden>Search</span>
              <svg width="31" height="29" viewBox="0 0 31 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.0023 11.2C22.0023 16.4901 17.4814 20.9 11.7511 20.9C6.02087 20.9 1.5 16.4901 1.5 11.2C1.5 5.90992 6.02087 1.5 11.7511 1.5C17.4814 1.5 22.0023 5.90992 22.0023 11.2Z" stroke="#333333" strokeWidth="3"/>
              <path d="M27.9786 27.9995C28.5976 28.5501 29.5453 28.4943 30.0955 27.8749C30.6456 27.2556 30.5898 26.3071 29.9709 25.7565L27.9786 27.9995ZM17.9062 19.0395L27.9786 27.9995L29.9709 25.7565L19.8985 16.7965L17.9062 19.0395Z" fill="#333333"/>
              </svg>
          </button>
          </div></div>
          <div className={archiveStyles.wrapper}>
          {filteredResults.length == 0 &&
          <div id="featured" className={styles.wrapper + " show"}>
          {(query?.length > 0 && filteredResults.length == 0) &&
            <em id="no-results"><TranslatedPhrase translations={languagePhrases} phrase={"noResults"}/> "{query}"</em>
          }
       
          {resources.map(function(node, index){

              let slug = "/learningresources/" + node.node.slug?.current || "";
              
              let institutionNames = []
              let instituteFound = false;

              let mediumNames = []
              let mediumFound = false;

              let themeNames = []
              let themeFound = false;

              let show = true;

              node.node.partners.forEach((p,i) => {
                institutionNames.push(p.name)
              })
              node.node.themes.forEach((p,i) => {
                themeNames.push(p.name)
              })
              node.node.mediums.forEach((p,i) => {
                mediumNames.push(p.name)
              })


              if(partnerFilter.length > 0){
                instituteFound = partnerFilter.some( ai => institutionNames.includes(ai) );
              }
              if(mediumFilter.length > 0){
                mediumFound = mediumFilter.some( ai => mediumNames.includes(ai) );
              }
              if(themeFilter.length > 0){
                themeFound = themeFilter.some( ai => themeNames.includes(ai) );
              }

              if(mediumFilter.length > 0 && !mediumFound){
                show = false;
              }

              if(themeFilter.length > 0 && !themeFound){
                show = false;
              }

              if(partnerFilter.length > 0 && !instituteFound){
                show = false;
              }

              if(yearFilter != "All"){
                    
                if(( (new Date(node.node._createdAt))?.getFullYear() == yearFilter) ){
                  show = true;
                }else{
                  show = false;
                }

              }

            if(show){
              return(
                <div className={styles.root}>
                  <Link to={"learning-resource/"+node.node.slug?.current}>
                    <h4><TranslatedTitle translations={node.node.titles}/></h4>
                    <BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={node.node.excerpts}/>
                    <Link className="button" to={"learning-resource/"+node.node.slug?.current}>See More</Link>
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
                  <h4><TranslatedTitle translations={node.titles}/></h4>
                    <BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={node.excerpts}/>
                    <Link className="button" to={"learning-resource/"+node.slug?.current}>See More</Link>
                  </Link>
                </div>
              )
            
          })}
          </div>
          }




          <div className={archiveStyles.filterWrapper + ' filterwrapper'}>
              <h1 onClick={(e) => bigAccordion(e)}><TranslatedPhrase translations={languagePhrases} phrase={'filters'}/>

              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5.5741H10.1481" stroke="black" strokeLinecap="round"/>
                    <path d="M5.57422 10.1481L5.57422 0.999983" stroke="black" strokeLinecap="round"/>
                    </svg>
              </h1>
              
              <div onClick={(e) => accordion(e)} className={archiveStyles.accordion + " accordion"}>
                <h4><TranslatedPhrase translations={languagePhrases} phrase={'relatedPartners'}/>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5.5741H10.1481" stroke="black" strokeLinecap="round"/>
                    <path d="M5.57422 10.1481L5.57422 0.999983" stroke="black" strokeLinecap="round"/>
                    </svg>
                </h4>
                <div>{partnerDivs}</div>
              </div>
              <div onClick={(e) => accordion(e)} className={archiveStyles.accordion + " accordion"}>
                <h4><TranslatedPhrase translations={languagePhrases} phrase={'medium'}/>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5.5741H10.1481" stroke="black" strokeLinecap="round"/>
                    <path d="M5.57422 10.1481L5.57422 0.999983" stroke="black" strokeLinecap="round"/>
                    </svg>
                  </h4>
                <div>
                  {mediumDivs}
                </div>
              </div>
              <div onClick={(e) => accordion(e)} className={archiveStyles.accordion + " accordion"}>
                <h4><TranslatedPhrase translations={languagePhrases} phrase={'theme'}/>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5.5741H10.1481" stroke="black" strokeLinecap="round"/>
                    <path d="M5.57422 10.1481L5.57422 0.999983" stroke="black" strokeLinecap="round"/>
                    </svg>
                </h4>
                <div>
                  {themeDivs}
                </div>
              </div>
              <div className={archiveStyles.yearResources}>
                <h4>Year</h4>
                <select onChange={handleYear}>
                  <option value={"All"}>Any</option>
                  <option value={"2023"}>2023</option>
                  <option value={"2022"}>2022</option>
                  <option value={"2021"}>2021</option>
                  <option value={"2020"}>2020</option>
                </select>
              </div>
             
             </div>


          </div>
        </Container>
      </Layout>
      
    </>
  );
};

export default LearningResources;
