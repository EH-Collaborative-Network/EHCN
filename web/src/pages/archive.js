import React, {useState} from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import { useFlexSearch } from 'react-use-flexsearch'
import Container from "../components/Container/container";
import ArchiveItem from "../components/ArchiveItem/archiveItem";
import BlockContent from "../components/TranslationHelpers/block-content";
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle";
import TranslatedPhrase from "../components/TranslationHelpers/translatedPhrase";
import translate from "../components/TranslationHelpers/translate";
import LangContext from "../components/context/lang";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import { Link } from "@reach/router";
import { Figure } from "../components/Figure/figure";
import Layout from "../containers/layout";
import * as styles from "../components/ArchiveItem/archive.module.css";


export const query = graphql`
  query ArchivePageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
      languages {
        name
        code
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
          calendar
          newsletter
          fundingOpportunities
          ehcnSupported
          learningResources
          researchThreads
          selectInstitution
          archive
          availableIn
          search
          application
          availableOpps
          networkWide
          studentLed
          results
          noResults
          facultyLed
        }
      }
    }
    workingGroups: allSanityWorkingGroup{
        edges{
            node {
                studentLed
                titles{
                  text
                  language{
                    id
                    name
                    code
                  }
                }
                themes{
                  id
                  name
                }
                mediums{
                  id
                  name
                }
                slug{
                    current
                }
                partners{
                  id
                  name
                  slug{
                    current
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
    events: allSanityEvent{
        edges{
            node {
                studentLed
                titles{
                  text
                  language{
                    id
                    name
                    code
                  }
                }
                startDate{
                  date
                  time
                }
                slug{
                    current
                }
                partners{
                  id
                  name
                  slug{
                    current
                  }
                }
                themes{
                  id
                  name
                }
                mediums{
                  id
                  name
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
    courses: allSanityCourse{
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
              themes{
                id
                name
              }
              mediums{
                id
                name
              }
              slug{
                  current
              }
              partners{
                id
                name
                slug{
                  current
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
    projects: allSanityProject{
        edges{
            node {
                studentLed
                titles{
                  text
                  language{
                    id
                    name
                    code
                  }
                }
                slug{
                    current
                }
                partners{
                  id
                  name
                  slug{
                    current
                  }
                }
                themes{
                  id
                  name
                }
                mediums{
                  id
                  name
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
    fp: allSanityPage(filter: {slug: {current: {eq: "archive"}}}) {
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

const ArchivePage = props => {
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
  const results = index ? useFlexSearch(query, index, store) : []
  let filteredResults = [];
  results?.map(function(node, index){
    if(node.type == "project" || node.type == "event" || node.type == "course" || node.type == "workingGroup"){
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
  const [studentLed, setStudentLed] = useState(true);
  const [facultyLed, setFacultyLed] = useState(true);
  const [partnerFilter, setPartnerFilter] = useState([]);
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
  const projects = (data || {}).projects?.edges;
  const partners = (data || {}).partners?.edges;
  const themes = (data || {}).themes?.edges;
  const mediums = (data || {}).mediums?.edges;
  const events = (data || {}).events?.edges;
  const workingGroups = (data || {}).workingGroups?.edges;
  const courses = (data || {}).courses?.edges;
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
  
  let all = [];
  projects.forEach((node,i) => {
        all.push(
            [node, "project"]
        )
  })
  events.forEach((node,i) => {
    all.push(
        [node, "event"]
    )
})
courses.forEach((node,i) => {
  all.push(
      [node, "course"]
  )
})
workingGroups.forEach((node,i) => {
  all.push(
      [node, "workingGroup"]
  )
})


  let partnerDivs = [] 
  partners.forEach((node,i) => {
        partnerDivs.push(
            <div key={i}>
              <input onChange={handlePartner} value={node.node.name} id={node.node.id} type={"checkbox"}></input>
              <label for={node.node.id}>{node.node.name}</label>
            </div> 
        )
  })

  let themeDivs = [] 
  themes.forEach((node,i) => {
        themeDivs.push(
            <div key={i}>
              <input onChange={handleTheme} value={node.node.name} id={node.node.id} type={"checkbox"}></input>
              <label for={node.node.id}><TranslatedTitle translations={node.node.titles}/></label>
            </div> 
        )
  })

  let mediumDivs = [] 
  mediums.forEach((node,i) => {
        mediumDivs.push(
            <div key={i}>
              <input onChange={handleMedium} value={node.node.name} id={node.node.id} type={"checkbox"}></input>
              <label for={node.node.id}><TranslatedTitle translations={node.node.titles}/></label>
            </div> 
        )
  })

  
  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }
  function handleCheck(e){
    let els;
    if(e.target.checked){

      if( e.target.value == 'student-led'){
        setStudentLed(true)
      }else{
        setFacultyLed(true)
      }
    }else{
      if( e.target.value == 'student-led'){
        if(facultyLed){
          setStudentLed(false)
        }else{
          e.target.checked = true;
        }
        
      }else{
        if(studentLed){
          setFacultyLed(false)
        }else{
          e.target.checked = true;
        }
      }
    }
  }
  function handleYear(e){
    setYearFilter(e.target.value);
  }
  function handlePartner(e){
    let els;
    let arr = partnerFilter.slice(0);
    if(e.target.checked){
      arr.push(e.target.value);
    }else{
      const index = arr.indexOf(e.target.value);
      if (index > -1) { // only splice array when item is found
        arr.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    setPartnerFilter(arr);
  }

  function handleMedium(e){
    let els;
    let arr = partnerFilter.slice(0);
    if(e.target.checked){
      arr.push(e.target.value);
    }else{
      const index = arr.indexOf(e.target.value);
      if (index > -1) { // only splice array when item is found
        arr.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    setMediumFilter(arr);
  }

  function handleTheme(e){
    let els;
    let arr = themeFilter.slice(0);
    if(e.target.checked){
      arr.push(e.target.value);
    }else{
      const index = arr.indexOf(e.target.value);
      if (index > -1) { // only splice array when item is found
        arr.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    setThemeFilter(arr);
  }

  return (
      <>  
      <Layout extra="" navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={false} marqueeContent={null}>
        <SEO title={site.title} description={site.description} keywords={site.keywords} />
        <Container>
          <h1 hidden>Welcome to {site.title}</h1>
          <h1><TranslatedTitle translations={(preview && previewData) ? previewData.titles : titles}/></h1>
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
              <path d="M22.0023 11.2C22.0023 16.4901 17.4814 20.9 11.7511 20.9C6.02087 20.9 1.5 16.4901 1.5 11.2C1.5 5.90992 6.02087 1.5 11.7511 1.5C17.4814 1.5 22.0023 5.90992 22.0023 11.2Z" stroke="#333333" stroke-width="3"/>
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
          <div className="top-text one-column"><BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={(preview && previewData) ? previewData.bodies : fp}/></div>
          
          <div className={styles.wrapper}>
             <div className={styles.resultsWrapper}>

             { filteredResults.length > 0 &&
<>
          {filteredResults.map(function(node, index){
            let slug = node.slug?.current || "";
            switch (node.type) {
              case 'learningResource':
                slug = "/learning-resource/"+slug;
                break;
              case 'course':
                slug = "/course/"+slug;
                break
              case 'fundingOpportunity':
                slug = "/funding/"+slug;
                break;
              case 'news':
                slug = "/news/"+slug;
                break;
              case 'event':
                slug = "/event/"+slug;
                break;
              case 'project':
                slug = "/project/"+slug;
                break;
              case 'workingGroup':
                slug = "/working-group/"+slug;
                break;
              case 'researchThread':
                slug = "/research-thread/"+slug;
                break;
              case 'partner':
                slug = "/partner/"+slug;
                break;
              default:
                slug = slug;
            }

              return(
                <ArchiveItem titles={node.titles} key={index} image={node.mainImage} link={slug}/>

              )
            
          })}
          </>

          }
{ filteredResults.length < 1 &&
<>
             { all.map(function(n, i){
                  let node = n[0]

                  let slug = node.node.slug?.current || "";
                  switch (node[1]) {
                    case 'learningResource':
                      slug = "/learning-resource/"+slug;
                      break;
                    case 'course':
                      slug = "/course/"+slug;
                      break
                    case 'fundingOpportunity':
                      slug = "/funding/"+slug;
                      break;
                    case 'news':
                      slug = "/news/"+slug;
                      break;
                    case 'event':
                      slug = "/event/"+slug;
                      break;
                    case 'project':
                      slug = "/project/"+slug;
                      break;
                    case 'workingGroup':
                      slug = "/working-group/"+slug;
                      break;
                    case 'researchThread':
                      slug = "/research-thread/"+slug;
                      break;
                    case 'partner':
                      slug = "/partner/"+slug;
                      break;
                    default:
                      slug = slug;
                  }
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
                  if(studentLed == false && node.node.studentLed){
                    show = false;
                  }
                  if(facultyLed == false && studentLed == true && !node.node.studentLed){
                    show = false;
                  }
                  if(yearFilter != "All"){
                    if(node.node.startDate?.date.split("-")[0] != yearFilter || node.node.starDate == `undefined`){
                      show = false
                    }
                  }

                  if(show){
                    return(
                        <ArchiveItem titles={node.node.titles} key={i} image={node.node.mainImage} link={slug}/>
                    )
                  }
                    
                 
              })
            }
            </>
}


             </div>
             <div className={styles.filterWrapper}>
              <h1>Filters</h1>
              <div>
                <input onChange={handleCheck} type="checkbox" id="student-led" name="student-led" value="student-led" defaultChecked={true}/>
                <label htmlFor="student-led"><span><TranslatedPhrase translations={languagePhrases} phrase={'studentLed'}/></span></label><br></br>
                <input onChange={handleCheck} type="checkbox" id="faculty-led" name="faculty-led" value="faculty-led" defaultChecked={true}/>
                <label htmlFor="faculty-led"><span><TranslatedPhrase translations={languagePhrases} phrase={"facultyLed"}/></span></label>
              </div>
              <div onClick={(e) => accordion(e)} className={styles.accordion + " accordion"}>
                <h4>EHCN Partners Involved
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5.5741H10.1481" stroke="black" stroke-linecap="round"/>
                    <path d="M5.57422 10.1481L5.57422 0.999983" stroke="black" stroke-linecap="round"/>
                    </svg>
                </h4>
                <div>{partnerDivs}</div>
              </div>
              <div onClick={(e) => accordion(e)} className={styles.accordion + " accordion"}>
                <h4>Medium/Format
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5.5741H10.1481" stroke="black" stroke-linecap="round"/>
                    <path d="M5.57422 10.1481L5.57422 0.999983" stroke="black" stroke-linecap="round"/>
                    </svg>
                  </h4>
                <div>
                  {mediumDivs}
                </div>
              </div>
              <div onClick={(e) => accordion(e)} className={styles.accordion + " accordion"}>
                <h4>Theme/Topic
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5.5741H10.1481" stroke="black" stroke-linecap="round"/>
                    <path d="M5.57422 10.1481L5.57422 0.999983" stroke="black" stroke-linecap="round"/>
                    </svg>
                </h4>
                <div>
                  {themeDivs}
                </div>
              </div>
              <div>
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

export default ArchivePage;
