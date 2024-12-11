import React, {useState, useEffect} from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import { useFlexSearch } from 'react-use-flexsearch'
import Container from "../components/Container/container";
import OngoingActivity from "../components/OngoingActivity/ongoingActivity";
import BlockContent from "../components/TranslationHelpers/block-content";
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle";
import TranslatedPhrase from "../components/TranslationHelpers/translatedPhrase";
import translate from "../components/TranslationHelpers/translate";
import LangContext from "../components/context/lang";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import TimeZoneList from "../components/Time/timeZoneList";
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import { Link } from "@reach/router";
import { Figure } from "../components/Figure/figure";
import Layout from "../containers/layout";
import * as styles from "../components/OngoingActivity/ongoingActivity.module.css";



export const query = graphql`
  query OngoingPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
      languages {
        name
        code
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
    items: localSearchItems {
      store
      index
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
    languagePhrases: allSanityLanguage {
      edges {
        node {
          name
          code
          aboutEHCN
          ongoing
          newsletter
          timezone
          events
          fundingOpportunities
          learningResources
          showPastEvents
          selectInstitution
          archive
          filters
          year
          medium
          theme
          availableIn
          search
          application
          availableOpps
          networkWide
          upcomingEvents
          results
          noResults
          showPastEvents
        }
      }
    }

    activities: allSanityOngoingActivity{
        edges{
            node {
                titles{
                  text
                  language{
                    id
                    name
                    code
                  }
                }
                online
                startDate{
                  date
                  time
                }
                mainLink{
                  url
                  text
                }
                locations{
                  _rawText(resolveReferences: { maxDepth: 20 })
                  language{
                    id
                    name
                    code
                  }
                }
                timeZone{
                  name
                  offset
                }
                endDate{
                  date
                  time
                }
                themes{
                  id
                  name
                }
                mediums{
                  id
                  name
                }
                descriptions{
                    _rawText(resolveReferences: { maxDepth: 20 })
                    language{
                    id
                    name
                    code
                    }
                }
                mainImage {
                    crop {
                      _key
                      _type
                      top
                      bottom
                      left
                      right
                    }
                    asset {
                      _id
                    }
                    altText
                  }
                
                id
              }
        }
    }


    fp: allSanityPage(filter: {slug: {current: {eq: "ongoing"}}}) {
      edges {
        node {
          id
          _id
          titles{
            text
            language{
              id
              name
              code
            }
          }
          bodies{
            _rawText(resolveReferences: { maxDepth: 20 })
            language{
              id
              name
              code
            }
          }
        }
      }
    }
  }
`;

const OngoingPage = props => {
  const { data, errors } = props;


  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const globalLanguages = site.languages;
  const fp = (data || {}).fp.edges[0]?.node?.bodies;
  let previewQuery = '*[_id == "drafts.'+ (data || {}).fp.edges[0]?.node?._id +'"]{ _id, titles[]{language->{code}, text}, bodies[]{language->{code}, text}}'
  const location = useLocation();
  let preview = false;
  const store = (data || {}).items?.store
  const index = (data || {}).items?.index
  const [query, setQuery] = useState(null);
  const [offset, setOffset] = useState(null);
  const results = index ? useFlexSearch(query, index, store) : []
  let filteredResults = [];
  results?.map(function(node, index){
    console.log(node)
    if(node.type == "ongoingActivity"){
      filteredResults.push(node)
    }
  })

  function isCurrentOrUpcoming(cdate, cmonth, cyear) {
    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = d.getMonth();
    let is = true;
    cmonth = cmonth - 1;


    if(cyear < year){
      is = false
    }else if(cyear > year){
      is = true
    }else{
      
      if(cmonth > month){
        is = true
      }else if(cmonth < month){
          is = false
      }else{
          if(cdate >= date){
            is = true
          }else if(cdate < date){
            is = false;
          }
      }
    }
    return is;
  }
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
  const [current, setCurrent] = useState(true);
  const [past, setPast] = useState(true);
  const [ongoing, setOngoing] = useState(true);
  const [online, setOnline] = useState(true);
  const [inperson, setInperson] = useState(true);

  const [mediumFilter, setMediumFilter] = useState([]);
  const [themeFilter, setThemeFilter] = useState([]);
  const [yearFilter, setYearFilter] = useState("All");
  
  const [previewData, setPreviewData] = useState(false)
  if(location?.search){
    preview = queryString.parse(location.search).preview;
  }
  if(preview && !previewData){
    const fetchData = async () => {
      setPreviewData(await client.fetch(previewQuery).then((data) => {
        return(data[0]);
      }))
    }
    fetchData()
  }

  const titles = (data || {}).fp.edges[0]?.node?.titles;


  const themes = (data || {}).themes?.edges;
  const mediums = (data || {}).mediums?.edges;
  const activities = (data || {}).activities?.edges;
  const languagePhrases = (data || {}).languagePhrases?.edges;
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

  /* Set currentFilter, currentMediums, currentLocation based on url params */
  useEffect(() => {

    if(location?.search){
      if(location.search.split("?").length > 1 ){
        params = location.search.split("?")[1].split("&");
      }
      params.forEach((param) => {
        let p = param.split("=")[0];
        let v = param.split("=")[1];
        if(p == "filter"){
          setCurrentFilter(v)
        }else if(p == "mediums" ){
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
        }else if(p == "upcoming"){
          if(v == "false"){
            document.querySelector("#show-upcoming").checked = false;
            setCurrent(false)
          }else{
            setCurrent(true)
          }
          
        }else if(p == "past"){
          if(v == "false"){
            document.querySelector("#show-past").checked = false;
            setPast(false)
          }else{
            setPast(true)
          }
          
        } else if(p == "ongoing"){
          if(v == "false"){
            document.querySelector("#show-ongoing").checked = false;
            setOngoing(false)
          }else{
            setOngoing(true)
          }
          
        }  else if(p == "online"){
          if(v == "false"){
            document.querySelector("#show-online").checked = false;
            setOnline(false)
          }else{
            setOnline(true)
          }
          
        }  else if(p == "inperson"){
          if(v == "false"){
            document.querySelector("#show-inperson").checked = false;
            setInperson(false)
          }else{
            setInperson(true)
          }
          
        } else if(p == "year"){
          setYearFilter(v)
        }
      })
    }
      }, []);






  let themeDivs = [] 
  themes.forEach((node,i) => {
    let n = node.node.name.split(" ").join("-")
    n = n.replace("&", "-");
    n = n.toLowerCase()
        themeDivs.push(
            <div key={i}>
              <input onChange={handleTheme} value={node.node.name} id={"theme-"+ n} type={"checkbox"}></input>
              <label htmlFor={"theme-"+n}><TranslatedTitle translations={node.node.titles}/></label>
            </div> 
        )
  })

  let mediumDivs = [] 
  mediums.forEach((node,i) => {
    let n = node.node.name.split(" ").join("-")
    n = n.replace("&", "-");
    n = n.toLowerCase()
        mediumDivs.push(
            <div key={i}>
              <input onChange={handleMedium} value={node.node.name} id={"medium-"+ n} type={"checkbox"}></input>
              <label htmlFor={"medium-"+ n}><TranslatedTitle translations={node.node.titles}/></label>
            </div> 
        )
  })

  
  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }


  /* Checkbox CHECK */
  function handleCheck(e){
    if(typeof window != `undefined`){
      let searchstring = window.location.search?.split("?")[1]
      let searchParams = [];
      //check param
      if(searchstring){
        let kv = searchstring.split("&");
        kv.forEach((k,i)=>{
          let newk = k.split("=");
          if((newk[0]!="upcoming" && e.target.value == "upcoming") || (newk[0]!="past" && e.target.value == "past")|| (newk[0]!="ongoing" && e.target.value == "ongoing") || (newk[0]!="online" && e.target.value == "online")|| (newk[0]!="inperson" && e.target.value == "inperson")){
            searchParams.push(newk.join("="))
          }
          
        })
      }
      
      let newSearchString = "?" + searchParams.join("&");
      
      

      
    
    
    if(e.target.checked){

      if( e.target.value == 'upcoming'){
        
        
        newSearchString = newSearchString + "&upcoming=" + true;
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + newSearchString;
        window.history.pushState({path:newurl},'',newurl);


        setCurrent(true)
      }else if(e.target.value == 'past'){

        newSearchString = newSearchString + "&past=" + true;
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + newSearchString;
        window.history.pushState({path:newurl},'',newurl);



        setPast(true)
      }else if(e.target.value == 'ongoing'){

        newSearchString = newSearchString + "&ongoing=" + true;
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + newSearchString;
        window.history.pushState({path:newurl},'',newurl);



        setOngoing(true)
      }else if(e.target.value == 'inperson'){

        newSearchString = newSearchString + "&inperson=" + true;
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + newSearchString;
        window.history.pushState({path:newurl},'',newurl);



        setInperson(true)
      }else if(e.target.value == 'online'){

        newSearchString = newSearchString + "&online=" + true;
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + newSearchString;
        window.history.pushState({path:newurl},'',newurl);



        setOnline(true)
      }
    }else{
      if( e.target.value == 'upcoming'){
        if(current){
          newSearchString = newSearchString + "&upcoming=" + false;;
          var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + newSearchString;
          window.history.pushState({path:newurl},'',newurl);
          setCurrent(false)
        }else{
          e.target.checked = true;
        }
        
      }else if(e.target.value == 'past'){
        if(past){
          newSearchString = newSearchString + "&past=" + false;
          var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + newSearchString;
          window.history.pushState({path:newurl},'',newurl);

          setPast(false)
        }else{
          e.target.checked = true;
        }
      }else if(e.target.value == 'ongoing'){
        if(past){
          newSearchString = newSearchString + "&ongoing=" + false;
          var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + newSearchString;
          window.history.pushState({path:newurl},'',newurl);

          setOngoing(false)
        }else{
          e.target.checked = true;
        }
      }else if(e.target.value == 'online'){
        if(past){
          newSearchString = newSearchString + "&online=" + false;
          var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + newSearchString;
          window.history.pushState({path:newurl},'',newurl);

          setOnline(false)
        }else{
          e.target.checked = true;
        }
      }else if(e.target.value == 'inperson'){
        if(past){
          newSearchString = newSearchString + "&inperson=" + false;
          var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + newSearchString;
          window.history.pushState({path:newurl},'',newurl);

          setInperson(false)
        }else{
          e.target.checked = true;
        }
      }
    }



    
    }


  }

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
        let n = e.target.value.split(" ").join("-")
        n = n.replace("&","-");
        n = n.toLowerCase();
        const index = currentMedium.indexOf(n);
        if (index > -1) { // only splice array when item is found
          currentMedium.splice(index, 1); // 2nd parameter means remove one item only
        }
      }else{
        currentMedium = []
      }
    let newSearchString;

    let arr = mediumFilter.slice(0);
    if(e.target.checked){
      let n = e.target.value.split(" ").join("-")
      n = n.replace("&","-");
      n = n.toLowerCase();
      newSearchString = "?" + searchParams.join("&");
      currentMedium.push(n);
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
  function handleTime(e){
    let value = e.target.value;
    if(value){
      let value = parseInt(value);
    }
    setOffset(value);
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
        let n = e.target.value.split(" ").join("-")
        n = n.replace("&","-");
        n = n.toLowerCase();
        const index = currentTheme.indexOf(n);
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
      let n = e.target.value.split(" ").join("-")
      n = n.replace("&","-");
      n = n.toLowerCase();
      currentTheme.push(n);
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
          <h1><TranslatedTitle translations={(preview && previewData) ? previewData.titles : titles}/></h1>
          <div className="top-text one-column"><BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={(preview && previewData) ? previewData.bodies : fp}/></div>

          <div><div className={styles.searchWrapper}>
          <LangContext.Consumer>
            {theme => {
                    return(
                    <input type="text" onKeyDown={handleEnter} placeholder={translate(languagePhrases, "search", theme) + " " + translate(languagePhrases, "archive", theme)} />
                )}}
          </LangContext.Consumer>
          <button onClick={handleSearch} aria-labelledby="search-label">
              <span id="search-label" hidden>Search</span>
              <svg width="31" height="29" viewBox="0 0 31 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.0023 11.2C22.0023 16.4901 17.4814 20.9 11.7511 20.9C6.02087 20.9 1.5 16.4901 1.5 11.2C1.5 5.90992 6.02087 1.5 11.7511 1.5C17.4814 1.5 22.0023 5.90992 22.0023 11.2Z" stroke="#333333" strokeWidth="3"/>
              <path d="M27.9786 27.9995C28.5976 28.5501 29.5453 28.4943 30.0955 27.8749C30.6456 27.2556 30.5898 26.3071 29.9709 25.7565L27.9786 27.9995ZM17.9062 19.0395L27.9786 27.9995L29.9709 25.7565L19.8985 16.7965L17.9062 19.0395Z" fill="#333333"/>
              </svg>
          </button>
          </div>
          {(query?.length > 0 && results.length == 0) &&
            <em id="no-results"><TranslatedPhrase translations={languagePhrases} phrase={"noResults"}/> "{query}"</em>
          }
          {filteredResults.length > 0 &&
                    <em><TranslatedPhrase translations={languagePhrases} phrase={"search"}/> <TranslatedPhrase translations={languagePhrases} phrase={"results"}/>:</em>
                  }
          </div>
          <div className={styles.selectWrapper}>
              <label className={styles.label} htmlFor="change-tz">{<TranslatedPhrase translations={languagePhrases} phrase={'timezone'}/>}:</label>
              <select className={styles.select} id="change-tz" onChange={handleTime}>
                <TimeZoneList />
              </select>
              <div>
            
          
          
          </div>
            </div>
          <div className={styles.wrapper}>
             <div className={styles.resultsWrapper}>

             { filteredResults.length > 0 &&
            <>
          {filteredResults.map(function(node, index){
           
            let currentOrUpcoming = "past";
            if(node.endDate){
              let d = node.endDate.date.split("-")
              
              if(isCurrentOrUpcoming(parseInt(d[2]),parseInt(d[1]), parseInt(d[0]))){
                currentOrUpcoming = "upcoming";
              }
            }else{
              currentOrUpcoming = "ongoing"
            }



              return(
                <OngoingActivity currentUpcoming={currentOrUpcoming} offset={offset} key={index} languagePhrases={languagePhrases} globalLanguages={globalLanguages} descriptions={node.descriptions} node={node} titles={node.titles} image={node.mainImage}/>

              )
            
          })}
          </>

          }
{ filteredResults.length < 1 &&
<>
             { activities.map(function(n, index){
                  let node = n


                  let mediumNames = []
                  let mediumFound = false;

                  let themeNames = []
                  let themeFound = false;
                  
                  let show = true;
                  
     
                  node.node.themes.forEach((p,i) => {
                    themeNames.push(p.name)
                  })
                  node.node.mediums.forEach((p,i) => {
                    mediumNames.push(p.name)
                  })
                  
                  
                
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
                  let currentOrUpcoming = "past";
                  if(node.node.endDate){
                      let d = node.node.endDate?.date.split("-")
                      if(isCurrentOrUpcoming(parseInt(d[2]),parseInt(d[1]), parseInt(d[0]))){
                        currentOrUpcoming = "upcoming";
                      }
                  }else{
                    currentOrUpcoming = "ongoing"
                  }
              


                    if(current == false && currentOrUpcoming == "upcoming"){
                      show = false;
                    }

                    if(past == false && currentOrUpcoming == "past"){
                      show = false;
                    }

                    if(ongoing == false && currentOrUpcoming == "ongoing"){
                      show = false;
                    }


                    if(online == false && node.node.online){
                      show = false;
                    }
                    if(inperson == false && !node.node.online){
                      show = false;
                    }
                  
                  
                  if(yearFilter != "All"){
                    
                    if(node.node.startDate?.date.split("-")[0] == yearFilter || ( (new Date(node.node._createdAt))?.getFullYear() == yearFilter) ){
                      // show = true;
                    }else if(!node.node.endDate){

                    }else{
                      show = false;
                    }

                  }

                  if(show){
                   
                    return(
                        <OngoingActivity currentUpcoming={currentOrUpcoming} offset={offset} key={index} globalLanguages={globalLanguages} languagePhrases={languagePhrases} descriptions={node.node.descriptions} node={node.node} titles={node.node.titles} image={node.node.mainImage}/>
                    )
                  }
                    
                 
              })
            }
            </>
}


             </div>
             <div className={styles.filterWrapper + ' filterwrapper'}>
              <h1 onClick={(e) => bigAccordion(e)}><TranslatedPhrase translations={languagePhrases} phrase={'filters'}/>

              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5.5741H10.1481" stroke="black" strokeLinecap="round"/>
                    <path d="M5.57422 10.1481L5.57422 0.999983" stroke="black" strokeLinecap="round"/>
                    </svg>
              </h1>
              <div className={styles.filterPastYear}>
              <div className={styles.currentPast}>

             
                <input onChange={handleCheck} type="checkbox" id="show-online" name="online" value="online" defaultChecked={true}/>
                <label htmlFor="show-online"><span>Online</span></label>
                <input onChange={handleCheck} type="checkbox" id="show-inperson" name="inperson" value="inperson" defaultChecked={true}/>
                <label htmlFor="show-inperson"><span>In-person</span></label>
              
              
              </div>
              <div className={styles.year}>
                <h4>Year</h4>
                <select onChange={handleYear}>
                  <option value={"All"}>Any</option>
                  <option value={"2024"}>2024</option>
                  <option value={"2023"}>2023</option>
                  <option value={"2022"}>2022</option>
                  <option value={"2021"}>2021</option>
                  <option value={"2020"}>2020</option>
                </select>
              </div>
              <div className={styles.currentPast}>
              <input onChange={handleCheck} type="checkbox" id="show-past" name="past" value="past" defaultChecked={true}/>
                <label htmlFor="show-past"><span>Past</span></label>
                <input onChange={handleCheck} type="checkbox" id="show-upcoming" name="upcoming" value="upcoming" defaultChecked={true}/>
                <label htmlFor="show-upcoming"><span>Upcoming</span></label>
                <input onChange={handleCheck} type="checkbox" id="show-ongoing" name="ongoing" value="ongoing" defaultChecked={true}/>
                <label htmlFor="show-ongoing"><span>Ongoing</span></label>
                </div>
              </div>
              <div onClick={(e) => accordion(e)} className={styles.accordion + " accordion"}>
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
              <div onClick={(e) => accordion(e)} className={styles.accordion + " accordion " }>
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
              
             
             </div>
          </div>
          
            
        </Container>
      </Layout>
      
    </>
  );
};

export default OngoingPage;
