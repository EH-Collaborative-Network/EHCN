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
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import Layout from "../containers/layout";
import Map from "../components/Map/map";
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
  const partners = (data || {}).partners.edges;
  // let previewQuery = '*[_id == "drafts.'+ (data || {}).hp.edges[0]?.node?._id +'"]{ _id, titles[]{language->{code}, text}, bodies[]{language->{code}, text}}'
  // const location = useLocation();
  let preview = null;
  // let preview = false;
  // const [previewData, setPreviewData] = useState(false)
  // if(location?.search){
  //   preview = queryString.parse(location.search).preview;
  // }
  // if(preview && !previewData){
  //   const fetchData = async () => {
  //     setPreviewData(await client.fetch(previewQuery).then((data) => {
  //       return(data[0]);
  //     }))
  //   }
  //   fetchData()
  // }

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  return (
      <>  
      <Layout extra='white' navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={site.showMarquee} marqueeContent={site.marqueeText}>
        <SEO title={site.title} description={site.description} keywords={site.keywords} />
        <Container>
          <h1 hidden>Welcome to {site.title}</h1>
          <div className="hp-text"><BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={(preview && previewData) ? previewData.bodies : hp}/></div>
          {
            typeof window != `undefined` &&
            <Map translations={languagePhrases} phrase={"ourPartners"} partners={partners}/>
          }
        </Container>
      </Layout>
      
    </>
  );
};

export default IndexPage;
