import React, {useState} from "react";
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
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import Person from "../components/Person/person";
import * as styles from "../components/Modal/modal.module.css";
import * as aboutStyles from "../components/AboutToggle/aboutToggle.module.css";
import { Link } from "@reach/router";
import TranslatedPhrase from "../components/TranslationHelpers/translatedPhrase";
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle";
import sanityClient from "@sanity/client";
const client = sanityClient({
  projectId: '46orb7yp',
  dataset: 'production',
  apiVersion: '2022-03-25', // use current UTC date - see "specifying API version"!
  token: 'skyfnkmqWJbwvihHkx2GQByHOktPsJB6ztzSRAfi7mZWaQegg23IaNrgFXjSxrBvL5Tli1zygeDqnUMr8QSXOZLNyjjhab5HTPsgD6QnBBxcNBOUwzGyiI69x7lpMKYhxZ94dpxLwIuVRBB1Hn47wR4rPtCpf17JGCYehmiLgCpMZrX1rzZW', // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})
export const query = graphql`
  query AboutPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
      languages {
        name
        code
      }
      aboutJustice{
        _rawText(resolveReferences: { maxDepth: 20 })
        language{
          id
          name
          code
        }
      }
      aboutCreativePractice{
        _rawText(resolveReferences: { maxDepth: 20 })
        language{
          id
          name
          code
        }
      }
      aboutTechnology{
        _rawText(resolveReferences: { maxDepth: 20 })
        language{
          id
          name
          code
        }
      }
    }
    languagePhrases: allSanityLanguage {
      edges {
        node {
          name
          code
          aboutEHCN
          EHCN
          calendar
          aboutP1
          aboutP2
          archive
          fundingOpportunities
          ehcnSupported
          newsletter
          technology
          justice
          creativepractice
          learningResources
          researchThreads
          availableIn
          search
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
    people: allSanityPerson{
        edges{
            node{
                id
                name
                staff
                fellow
                steering
                bios{
                  _rawText(resolveReferences: { maxDepth: 20 })
                  language{
                    id
                    name
                    code
                  }
                }
                image {
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
    }
    ap: allSanityPage(filter: {slug: {current: {eq: "about"}}}) {
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

const AboutPage = props => {
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
  const [toggle, setToggle] = useState("technology");
  const ap = (data || {}).ap.edges[0]?.node?.bodies;
  let previewQuery = '*[_id == "drafts.'+ (data || {}).ap.edges[0]?.node?._id +'"]{ _id, titles[]{language->{code}, text}, bodies[]{language->{code}, text}}'
  const location = useLocation();
  let preview = false;
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
  const titles = (data || {}).ap.edges[0]?.node?.titles;
  const people = (data || {}).people?.edges;
  const partners = (data || {}).partners?.edges;
  const languagePhrases = (data || {}).languagePhrases?.edges;

  const steeringPeople = [];
  const staffPeople = [];


  people.sort(function(a, b) {
    var textA = a.node.name.split(' ')[1].toUpperCase();
    var textB = b.node.name.split(' ')[1].toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });
 

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }






  return (
      <>  
      <Layout extra='' navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={false} marqueeContent={null}>
        <SEO title={site.title} description={site.description} keywords={site.keywords} />
        <Container>
          <h1 hidden>Welcome to {site.title}</h1>

          
                
          <h1><TranslatedTitle translations={(preview && previewData) ? previewData.titles : titles}/></h1>
          <div><div className={aboutStyles.overwrapper}> 
              <div className={aboutStyles.wrapper}>
                <div>
                <div className={aboutStyles.bubble +" "}>
                    <BlockContent languagePhrases={languagePhrases} blocks={site.aboutTechnology} globalLanguages={globalLanguages}/>
                  </div>
                  <div className={aboutStyles.bubble +" "}>
                  <BlockContent languagePhrases={languagePhrases} blocks={site.aboutJustice} globalLanguages={globalLanguages}/>
                </div>
                <div className={aboutStyles.bubble +" "}>
                    <BlockContent languagePhrases={languagePhrases} blocks={site.aboutCreativePractice} globalLanguages={globalLanguages}/>
                  </div>
                  </div>
              </div>
              <div><div className={aboutStyles.aboveWrapper}><TranslatedPhrase translations={languagePhrases} phrase={"aboutP2"}/><p><TranslatedPhrase translations={languagePhrases} phrase={"aboutP1"}/></p></div></div>
            </div> </div>

          <div className="top-text about-page one-column"><BlockContent languagePhrases={languagePhrases} blocks={(preview && previewData) ? previewData.bodies : ap} globalLanguages={globalLanguages}/></div>
 
          

          <h4>Partner Institutions</h4> 
          <div className="">
            <div className={styles.partners}>
            {partners.map(function(node, index){
                return <Link to={"/partner/"+node.node.slug.current} key={index}><div className={styles.partner}>{node.node.name + ""}</div>, </Link>;
            })}
            </div>
          </div>
          <h4>Steering Committee</h4>
          <div className="">
            <ul className={styles.steering + " two-column"}>
            {people.map(function(node, index){
              if(node.node.steering){
                return <li key={index}><Person blue={true} person={node}></Person></li>;
              }
            })}
            </ul>
          </div>
          <div className={styles.twoColumnStaff}>
            <div className="staff-no-column">
            <h4>Staff</h4>
              <ul className={styles.steering}>
              {people.map(function(node, index){
                if(node.node.staff){
                  return <li key={index}><Person blue={true} person={node}></Person></li>;
                }
              })}
              </ul>
            </div>
            
            <div className="staff-no-column">
            <h4>Fellows</h4>
              <ul className={styles.steering}>
              {people.map(function(node, index){
                if(node.node.fellow){
                  return <li key={index}><Person blue={true} person={node}></Person></li>;
                }
              })}
              </ul>
            </div>
          </div>
       
        </Container>
      </Layout>
      
    </>
  );
};

export default AboutPage;
