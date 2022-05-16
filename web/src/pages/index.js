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
import Map from "../components/map";


export const query = graphql`
  query IndexPageQuery {
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
          ourPartners
        }
      }
    }
    hp: allSanityPage(filter: {name: {eq: "Homepage"}}) {
      edges {
        node {
          id
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
  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : [];
  console.log(projectNodes)
  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  return (
      <>  
      <Layout extra='white' navTranslations={languagePhrases} globalLanguages={globalLanguages}>
        <SEO title={site.title} description={site.description} keywords={site.keywords} />
        <Container>
          <h1 hidden>Welcome to {site.title}</h1>
          <BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={hp}/>
          <Map translations={languagePhrases} phrase={"ourPartners"} partners={partners}/>
        </Container>
      </Layout>
      
    </>
  );
};

export default IndexPage;
