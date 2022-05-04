import React from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import Container from "../components/container";
import BlockContent from "../components/block-content";
import TranslatedTitle from "../components/translatedTitle";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { FundingOpportunity } from "../components/fundingOpportunity";
import * as styles from "../components/css/fundingopp.module.css";
export const query = graphql`
  query FundingPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
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
                  _rawText(resolveReferences: { maxDepth: 20 })
                  language{
                    id
                    name
                  }
                }
              }
        }
    }
    fp: allSanityPage(filter: {slug: {current: {eq: "funding"}}}) {
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

const FundingPage = props => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const fp = (data || {}).fp.edges[0]?.node?.bodies;
  const titles = (data || {}).fp.edges[0]?.node?.titles;
  const oppNodes = (data || {}).opps?.edges;
  let institutionOpps = [];
  let networkOpps = [];
  oppNodes.forEach(node => {
    if(node.node.institution){
      institutionOpps.push(node.node);
    }else{
      networkOpps.push(node.node)
    }
  });
  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  return (
      <>  
      <Layout>
        <SEO title={site.title} description={site.description} keywords={site.keywords} />
        <Container>
          <h1 hidden>Welcome to {site.title}</h1>
          <h1><TranslatedTitle translations={titles}/></h1>
          <div className="top-text two-column"><BlockContent blocks={fp}/></div>
          <div className="funding-opportunities">
            <div className={styles.network}>
            <h5>Viewing Network-wide Opportunities</h5>
            <div className={styles.toggle}>Show Institution-specific Opportunities→</div>
            <div className={styles.institution}>
                  {networkOpps.map(function(node, index){
                    return <FundingOpportunity key={index} node={node}></FundingOpportunity>;
                  })}
            </div>
            </div>
            <div className={styles.institution}>
              <h5>Viewing Institution-specific Opportunities</h5>
              <div className={styles.wrapper}>
                  {institutionOpps.map(function(node, index){
                    return <FundingOpportunity key={index} node={node}></FundingOpportunity>;
                  })}
              </div>
            </div>
          </div>
        </Container>
      </Layout>
      
    </>
  );
};

export default FundingPage;
