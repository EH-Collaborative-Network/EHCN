import React from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import Container from "../components/container";
import BlockContent from "../components/block-content";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import TranslatedPhrase from "../components/translatedPhrase";
import TranslatedTitle from "../components/translatedTitle";
import Carousel from "../components/carousel";
import * as styles from "../components/css/research.module.css";
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
          learningResources
          researchThreads
          availableIn
          search
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
                    name
                    code
                  }
                }
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
          studentLed
          titles{
            text
            language{
              id
              name
              code
            }
          }
          projects{
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
              hotspot {
                _key
                _type
                x
                y
                height
                width
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
                hotspot {
                  _key
                  _type
                  x
                  y
                  height
                  width
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
  function handleCheck(e){
    let els;
    if(e.target.checked){
      els = document.querySelectorAll("." + e.target.value);
      for(let i = 0; i < els.length; i++){
        els[i].classList.add("show-thread");
      }
    }else{
      els = document.querySelectorAll("." + e.target.value);
      for(let i = 0; i < els.length; i++){
        els[i].classList.remove("show-thread");
      }
    }
  }
  return (
      <>  
      <Layout extra="" navTranslations={languagePhrases} globalLanguages={globalLanguages}>
        <SEO title={site.title} description={site.description} keywords={site.keywords} />
        <Container>
          <h1 hidden>Welcome to {site.title}</h1>
          <h1><TranslatedPhrase translations={languagePhrases} phrase={"researchThreads"}/></h1>
          <div className={styles.facultyStudent}>
            <input onChange={handleCheck} type="checkbox" id="student-led" name="student-led" value="student-led" defaultChecked={true}/>
            <label for="student-led"><em>Show Student-led Research Threads</em></label><br></br>
            <input onChange={handleCheck} type="checkbox" id="faculty-led" name="faculty-led" value="faculty-led" defaultChecked={true}/>
            <label for="faculty-led"><em>Show Faculty-led Research Threads</em></label>
          </div>
        {threads.map(function(thread,index){
          let media = []

          thread.node.projects.map(function(project,index){
            let x = []
            x.push(project.mainImage)
            x.push(project.titles)
            x.push(project.slug.current)
            media.push(x)
          })
          return(
            <div className={styles.root + " show-thread " + (thread.node.studentLed ? "student-led" : "faculty-led")}>
                <div className={styles.main}>
                  <Link to={"research-thread/"+thread.node.slug?.current}>
                  <h4><TranslatedTitle translations={thread.node.titles}/>→</h4>
                  <BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={thread.node.descriptions}/>
                  </Link>
                </div>
                {media.length > 0 && 
                 <div className={styles.wrapper}> <Carousel media={media} imageOnly={true}/></div>
                }
            </div>
          )
        })}
        </Container>
      </Layout>
      
    </>
  );
};

export default ResearchThreads;
