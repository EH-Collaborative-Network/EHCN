import React from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import Container from "../components/Container/container";
import BlockContent from "../components/TranslationHelpers/block-content";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import TranslatedPhrase from "../components/TranslationHelpers/translatedPhrase";
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle";
import Carousel from "../components/Carousel/carousel";
import List from "../components/List/list";
import * as styles from "../components/ResearchThread/research.module.css";
import { useState } from 'react';
import { Link } from "@reach/router";
export const query = graphql`
  query ThreadsPageQuery {
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
          newsletter
          learningResources
          researchThreads
          availableIn
          search
          studentLed
          facultyLed
        }
      }
    }
    researchThreads: allSanityResearchThread(
      limit: 60
      filter: { slug: { current: { ne: null } }}
    ) {
      edges {
        node {
          id
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
          events{
            id
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
            media{
              embed{
                embed
                altText
                caption
              }
              pdf{
                altText
                caption
                asset {
                  url
                  _id
                }
              }
              image{
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
            }
          }
          workingGroups{
            id
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
            media{
              embed{
                embed
                altText
                caption
              }
              pdf{
                altText
                caption
                asset {
                  url
                  _id
                }
              }
              image{
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
            }
          }
          projects{
            id
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
            media{
              embed{
                embed
                altText
                caption
              }
              pdf{
                altText
                caption
                asset {
                  url
                  _id
                }
              }
              image{
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
            }
          }
          courses{
            id
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
            media{
              embed{
                embed
                altText
                caption
              }
              pdf{
                altText
                caption
                asset {
                  url
                  _id
                }
              }
              image{
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
            }
          }
          learningResources{
            id
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
            media{
              embed{
                embed
                altText
                caption
              }
              pdf{
                altText
                caption
                asset {
                  url
                  _id
                }
              }
              image{
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
            }
          }
          descriptions{
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

const ResearchThreads = props => {
  const { data, errors } = props;
  const [studentLed, setStudentLed] = useState(true);
  const [facultyLed, setFacultyLed] = useState(true);
  const [list, setList] = useState(false);
  const languagePhrases = (data || {}).languagePhrases?.edges;
  const threads = (data || {}).researchThreads.edges;
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
  function handleList(e){
    if(e.target.checked){
      setList(true)
    }else{
      setList(false)
    }
    
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
  return (
      <>  
      <Layout extra="" navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={false} marqueeContent={null}>
        <SEO title={site.title} description={site.description} keywords={site.keywords} />
        <Container>
          <h1 hidden>Welcome to {site.title}</h1>
          <h1><TranslatedPhrase translations={languagePhrases} phrase={"researchThreads"}/></h1>
         
          <div className={styles.facultyStudent}>
            <input onChange={handleList} type="checkbox" id="list-led" name="list-led" value="list-led" defaultChecked={false}/>
            <label htmlFor="list-led"><em>List View</em></label><br></br>
            <input onChange={handleCheck} type="checkbox" id="student-led" name="student-led" value="student-led" defaultChecked={true}/>
            <label htmlFor="student-led"><em><TranslatedPhrase translations={languagePhrases} phrase={'studentLed'}/></em></label><br></br>
            <input onChange={handleCheck} type="checkbox" id="faculty-led" name="faculty-led" value="faculty-led" defaultChecked={true}/>
            <label htmlFor="faculty-led"><em><TranslatedPhrase translations={languagePhrases} phrase={"facultyLed"}/></em></label>
          </div>
        {threads.map(function(thread,index){

          let media = []

          thread.node.projects?.map(function(project,index){
            let x = []
            x.push(project.mainImage)
            x.push(project.titles)
            x.push("/project/"+project.slug.current)
            if(studentLed && project.studentLed){
              media.push(x)
            } else if(facultyLed && !project.studentLed){
              media.push(x)
            }
          })
          thread.node.events?.map(function(project,index){
            let x = []
            x.push(project.mainImage)
            x.push(project.titles)
            x.push("/event/"+project.slug.current)
            if(studentLed && project.studentLed){
              media.push(x)
            } else if(facultyLed && !project.studentLed){
              media.push(x)
            }
          })
          thread.node.workingGroups?.map(function(project,index){
            let x = []
            x.push(project.mainImage)
            x.push(project.titles)
            x.push("/working-group/"+project.slug.current)
            if(studentLed && project.studentLed){
              media.push(x)
            } else if(facultyLed && !project.studentLed){
              media.push(x)
            }
          })
          thread.node.courses?.map(function(project,index){
            let x = []
            x.push(project.mainImage)
            x.push(project.titles)
            x.push("/course/"+project.slug.current)
            if(studentLed && project.studentLed){
              media.push(x)
            } else if(facultyLed && !project.studentLed){
              media.push(x)
            }
          })
          if(media.length > 0){

          
          return(
          
     
            <div key={index} className={styles.root + " show-thread " + (thread.node.studentLed ? "student-led" : "faculty-led")}>
                <div className={styles.main}>
                  <Link to={"research-thread/"+thread.node.slug?.current}>
                  <h4><TranslatedTitle translations={thread.node.titles}/></h4>
                  <BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={thread.node.descriptions}/>
                  </Link>
                </div>
                {media.length > 0 && 
                
                 <div className={styles.wrapper}>
                  {list ?
                  <List media={media} />
                  :
                  <Carousel media={media} imageOnly={true}/>
                
                  }
                 </div>
                }
            </div>
     
          )
              }
        })}
        </Container>
      </Layout>
      
    </>
  );
};

export default ResearchThreads;
