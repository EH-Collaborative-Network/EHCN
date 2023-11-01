import React, {useState} from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
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
          facultyLed
        }
      }
    }
    workingGroups: allSanityWorkingGroup{
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
    events: allSanityEvent{
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

  const [studentLed, setStudentLed] = useState(true);
  const [facultyLed, setFacultyLed] = useState(true);
  const [partnerFilter, setPartnerFilter] = useState([]);
  const [mediumFilter, setMediumFilter] = useState([]);
  const [themeFilter, setThemeFilter] = useState([]);
  
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
  let all = [].concat(projects).concat(events).concat(workingGroups).concat(courses);

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
          <div className="top-text one-column"><BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={(preview && previewData) ? previewData.bodies : fp}/></div>
          
          <div className={styles.wrapper}>
             <div className={styles.resultsWrapper}>
             { all.map(function(node, i){
                  let institutionNames = []
                  let instituteFound = false;

                  let mediumNames = []
                  let mediumFound = false;

                  let themenNames = []
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
                    mediumFound = mediumFilter.some( ai => mediumnNames.includes(ai) );
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

                  if(partnerFilter.length > 0 && !partnerFound){
                    show = false;
                  }
                  if(show){
                    return(
                        <ArchiveItem titles={node.node.titles} key={i} image={node.node.mainImage} link={'/projects/'+node.node.slug.current}/>
                    )
                  }
                    
                 
              })
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
                <select>
                  <option>2023</option>
                  <option>2024</option>
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
