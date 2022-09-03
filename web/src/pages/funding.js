import React, {useState} from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import Container from "../components/Container/container";
import BlockContent from "../components/TranslationHelpers/block-content";
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import Layout from "../containers/layout";
import { FundingOpportunity } from "../components/FundingOpportunity/fundingOpportunity";
import * as styles from "../components/FundingOpportunity/fundingopp.module.css";
import sanityClient from "@sanity/client";
const client = sanityClient({
  projectId: '46orb7yp',
  dataset: 'production',
  apiVersion: '2022-03-25', // use current UTC date - see "specifying API version"!
  token: 'skyfnkmqWJbwvihHkx2GQByHOktPsJB6ztzSRAfi7mZWaQegg23IaNrgFXjSxrBvL5Tli1zygeDqnUMr8QSXOZLNyjjhab5HTPsgD6QnBBxcNBOUwzGyiI69x7lpMKYhxZ94dpxLwIuVRBB1Hn47wR4rPtCpf17JGCYehmiLgCpMZrX1rzZW', // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})

export const query = graphql`
  query FundingPageQuery {
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
          newsletter
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
    fp: allSanityPage(filter: {slug: {current: {eq: "funding"}}}) {
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

const FundingPage = props => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }
  const [networkWide, setNetworkWide] = useState(true);
  
  const site = (data || {}).site;
  const globalLanguages = site.languages;
  const fp = (data || {}).fp.edges[0]?.node?.bodies;
  let previewQuery = '*[_id == "drafts.'+ (data || {}).fp.edges[0]?.node?._id +'"]{ _id, titles[]{language->{code}, text}, bodies[]{language->{code}, text}}'
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
  const titles = (data || {}).fp.edges[0]?.node?.titles;
  const oppNodes = (data || {}).opps?.edges;
  const languagePhrases = (data || {}).languagePhrases?.edges;
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
  function handler(){
    console.log('hi')
    let nw = !networkWide;
    setNetworkWide(nw)
    console.log('ran')
  }
  return (
      <>  
      <Layout extra="" navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={false} marqueeContent={null}>
        <SEO title={site.title} description={site.description} keywords={site.keywords} />
        <Container>
          <h1 hidden>Welcome to {site.title}</h1>
          <h1><TranslatedTitle translations={(preview && previewData) ? previewData.titles : titles}/></h1>
          <div className="top-text two-column"><BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={(preview && previewData) ? previewData.bodies : fp}/></div>
          <div className="funding-opportunities">
          { networkWide &&
            <div className={styles.network}>
            <h5>Showing <em>Network-wide</em> Opportunities below.  &nbsp;</h5>
            <div onClick={handler} className={styles.toggle + " " + "button"}>Show <em>Institution-specific</em> Opportunities instead→</div>
            <div className={styles.institution}>
                  {networkOpps.map(function(node, index){
                    return <FundingOpportunity languagePhrases={languagePhrases} globalLanguages={globalLanguages} key={index} node={node}></FundingOpportunity>;
                  })}
            </div>
            </div>
            }
            { !networkWide && 
            <div className={styles.institution}>
              <h5>Showing <em>Institution-specific</em> Opportunities below.  &nbsp;</h5>
              <div onClick={handler} className={styles.toggle + " " + "button"}>Show <em>Network-wide</em> Opportunities instead→</div>
           
              <div className={styles.wrapper}>
                  {institutionOpps.map(function(node, index){
                    return <FundingOpportunity languagePhrases={languagePhrases} globalLanguages={globalLanguages} key={index} node={node}></FundingOpportunity>;
                  })}
              </div>
            </div>
            }
          </div>
        </Container>
      </Layout>
      
    </>
  );
};

export default FundingPage;
