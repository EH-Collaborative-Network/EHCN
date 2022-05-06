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
export const query = graphql`
  query AboutPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
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
            }
          }
          bodies{
            _rawText(resolveReferences: { maxDepth: 20 })
            language{
              id
              name
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
  const ap = (data || {}).ap.edges[0]?.node?.bodies;
  const people = (data || {}).people?.edges;
  const partners = (data || {}).partners?.edges;
console.log(partners)
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
    console.log(node.node.staff)
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
      <Layout extra=''>
        <SEO title={site.title} description={site.description} keywords={site.keywords} />
        <Container>
          <h1 hidden>Welcome to {site.title}</h1>
          <h1>About EHCN</h1>
          <div className="top-text two-column"><BlockContent blocks={ap}/></div>
          <br/>
          <h4>Partner Institutions</h4>
          <div className="">
            <div className={styles.partners}>
            {partners.map(function(node, index){
                return <Link to={"/"+node.node.slug.current} key={index}><div className="button">{node.node.name + "→"}</div></Link>;
            })}
            </div>
          </div>
          <h4>Steering Committee</h4>
          <div className="two-column">
            <ul className={styles.steering}>
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
