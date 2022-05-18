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
import Person from "../components/person";
import * as styles from "../components/css/modal.module.css";
import { Link } from "@reach/router";
import TranslatedTitle from "../components/translatedTitle";
export const query = graphql`
  query AboutPageQuery {
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
    }
    ap: allSanityPage(filter: {slug: {current: {eq: "about"}}}) {
      edges {
        node {
          id
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
    projects: allSanityProject(
      limit: 6
      filter: { slug: { current: { ne: null } }}
    ) {
      edges {
        node {
          id
          name
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
  const ap = (data || {}).ap.edges[0]?.node?.bodies;
  const titles = (data || {}).ap.edges[0]?.node?.titles;
  const people = (data || {}).people?.edges;
  const partners = (data || {}).partners?.edges;
  const languagePhrases = (data || {}).languagePhrases?.edges;

  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : [];

  const steeringPeople = [];
  const staffPeople = [];

  people.map(function(node,index){
    if(node.node.steering){
      steeringPeople.push(node);
    }
   
    if(node.node.staff){
      staffPeople.push(node);
    }
  })

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }


  return (
      <>  
      <Layout extra='' navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={site.showMarquee} marqueeContent={site.marqueeText}>
        <SEO title={site.title} description={site.description} keywords={site.keywords} />
        <Container>
          <h1 hidden>Welcome to {site.title}</h1>
          <h1><TranslatedTitle translations={titles}/></h1>
          <div className="top-text two-column"><BlockContent languagePhrases={languagePhrases} blocks={ap} globalLanguages={globalLanguages}/></div>
          <br/>
          <h4>Partner Institutions</h4> 
          <div className="">
            <div className={styles.partners}>
            {partners.map(function(node, index){
                return <Link to={"/partner/"+node.node.slug.current} key={index}><div className="button">{node.node.name + "→"}</div></Link>;
            })}
            </div>
          </div>
          <h4>Steering Committee</h4>
          <div className="">
            <ul className={styles.steering + " two-column"}>
            {steeringPeople.map(function(node, index){
                return <Person key={index} person={node}></Person>;
            })}
            </ul>
          </div>
          <h4>Staff</h4>
          <div className="two-column">
            <ul className={styles.steering}>
            {staffPeople.map(function(node, index){
                return <Person key={index} person={node}></Person>;
            })}
            </ul>
          </div>
        </Container>
      </Layout>
      
    </>
  );
};

export default AboutPage;
