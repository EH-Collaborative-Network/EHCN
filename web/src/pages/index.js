import React, {useState} from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import Carousel from "../components/Carousel/carousel";
import Container from "../components/Container/container";
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle";
import BlockContent from "../components/TranslationHelpers/block-content";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import Layout from "../containers/layout";
import { Link } from "@reach/router";
import Map from "../components/Map/map";
import Modal from "../components/Modal/modal";
import TranslatedPhrase from "../components/TranslationHelpers/translatedPhrase";
import sanityClient from "@sanity/client";
const client = sanityClient({
  projectId: '46orb7yp',
  dataset: 'production',
  apiVersion: '2022-03-25', // use current UTC date - see "specifying API version"!
  token: 'skyfnkmqWJbwvihHkx2GQByHOktPsJB6ztzSRAfi7mZWaQegg23IaNrgFXjSxrBvL5Tli1zygeDqnUMr8QSXOZLNyjjhab5HTPsgD6QnBBxcNBOUwzGyiI69x7lpMKYhxZ94dpxLwIuVRBB1Hn47wR4rPtCpf17JGCYehmiLgCpMZrX1rzZW', // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
      showMarquee
      highlightTitle{
        text
        language{
          id
          name
          code
        }
      }
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
      eventHighlights {
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
      }
      projectHighlights {
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
      }
    }
    events: allSanityEvent(
      limit: 40
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
        }
      }
    }
    projects: allSanityProject(
      limit: 40
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
        }
      }
    }
    resources: allSanityLearningResource(
      limit: 40
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
        }
      }
    }
    languagePhrases: allSanityLanguage {
      edges {
        node {
          name
          code
          aboutEHCN
          archive
          justice
          technology
          creativepractice
          events
          fundingOpportunities
          ehcnSupported
          newsletter
          learningResources
          researchThreads
          availableIn
          search
          ourPartners
        }
      }
    }
    hp: allSanityPage(filter: {name: {eq: "Homepage"}}) {
      edges {
        node {
          id
          _id
          bodies{
            _rawText(resolveReferences: { maxDepth: 20 })
            language{
              id
              code
              name
            }
          }
        }
      }
    }
    menu: allSanityLanguage {
      edges {
        node {
          id
          fundingOpportunities
          researchThreads
          calendar
          aboutEHCN
        }
      }
    }
  }
`;

const IndexPage = props => {
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
  const hp = (data || {}).hp.edges[0]?.node?.bodies;
  const languagePhrases = (data || {}).languagePhrases?.edges;
  const events = (data || {}).events?.edges
  const resources = (data || {}).resources?.edges
  const projects = (data || {}).projects?.edges
  // declare the function 
  const shuffle = (array) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  }; 

  const sliceIntoChunks = (arr, chunkSize) => {
      const res = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
          const chunk = arr.slice(i, i + chunkSize);
          res.push(chunk);
      }
      return res;
  }
  let scrollTitles = [];

  events.map(function(event,index){
    scrollTitles.push(
      <div className={Math.random() > 0.5 ? "large-title" :"title"}><Link to={'/events/'+ event.node.slug.current}><TranslatedTitle translations={event.node.titles}/></Link></div>
    )
  })
  projects.map(function(project,index){
    scrollTitles.push(
      <div className={Math.random() > 0.5 ? "large-title" :"title"}><Link to={'/projects/'+ project.node.slug.current}><TranslatedTitle translations={project.node.titles}/></Link></div>
    )
  })
  resources.map(function(resource,index){
    scrollTitles.push(
      <div className={Math.random() > 0.5 ? "large-title" :"title"}><Link to={'/learningResource/'+ resource.node.slug.current}><TranslatedTitle translations={resource.node.titles}/></Link></div>
    )
  })
  
  scrollTitles = shuffle(scrollTitles)
  scrollTitles = sliceIntoChunks(scrollTitles, Math.floor(scrollTitles.length/3))


  let media = []

  site.projectHighlights?.map(function(project,index){
    let x = []
    x.push(project.mainImage)
    x.push(project.titles)
    x.push("/project/"+project.slug.current)
    media.push(x)
  })
  site.eventHighlights?.map(function(event,index){
    let x = []
    x.push(event.mainImage)
    x.push(event.titles)
    x.push("/event/"+event.slug.current)
    media.push(x)
  })

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }
  const statement = (<div><p>
    <Link to={"/aqb-voices"}>Al-Quds Bard College (AQB)</Link> in Palestine is a vital partner in the Experimental Humanities Collaborative Network. We reaffirm our admiration and support for the work our AQB colleagues and students do everyday in their aspiration for freedom. Much of this work contends with the longstanding and ongoing occupation, dehumanization, misrepresentation and subjugation of the Palestinian people. Linked below are some of their recent EHCN projects and activities. Please listen to their voices and learn from their stories.
    </p><Link className="blue-button" to={"/aqb-voices"}>Voices of Al-Quds Bard College</Link>
    </div>)
  return (
      <>  
      <Layout extra='white' navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={site.showMarquee} marqueeContent={site.marqueeText}>
        <SEO title={site.title} description={site.description} keywords={site.keywords} />
        <Container>
          <h1 hidden>Welcome to {site.title}</h1>
          <h1 style={{"textTransform":"capitalize"}}><TranslatedPhrase translations={languagePhrases} phrase={"technology"}/>, <TranslatedPhrase translations={languagePhrases} phrase={"justice"}/>, & <TranslatedPhrase translations={languagePhrases} phrase={"creativepractice"}/></h1>
          <div className="hp-text"><BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={hp}/></div>
          {
            typeof window != `undefined` &&
            <Map/>
          }
          <div className="hp-highlights">
            <h4>
              <span><TranslatedTitle translations={site.highlightTitle}/></span>
            <Link className={"blue-button"} to={"/aqb-voices"}>See More</Link>
            </h4>
            <Carousel media={media} imageOnly={true}/>
          </div>

          <div className="hp-scrollText">
            <div className="inner">
            {scrollTitles[0]}
            </div>
            <div className="inner">
            {scrollTitles[1]}
            </div>
            <div className="inner">
            {scrollTitles[2]}
            </div>
          </div>

              <div className="hidden-sanity">
               <span> Structured content powered by <a href="https://sanity.io">Sanity.io</a>
              </span>    
              </div>  
          
        </Container>


        {/* <Modal start={true} raw={statement}></Modal> */}
      </Layout>
      
    </>
  );
};

export default IndexPage;
