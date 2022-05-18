import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import TranslatedTitle from "../components/translatedTitle";
import Carousel from "../components/carousel";
import BlockContent from "../components/block-content";
export const query = graphql`
  query PageTemplateQuery($id: String!) {
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
    samplePage: sanityPage(id: { eq: $id }) {
      id
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
      bodies{
        _rawText(resolveReferences: { maxDepth: 20 })
        language{
          id
          code
          name
        }
      }
      slug {
        current
      }
      
    }
  }
`;

const PageTemplate = props => {
  const { data, errors } = props;
  const page = data && data.samplePage;
  const site = (data || {}).site;
  const globalLanguages = site.languages;
  const languagePhrases = (data || {}).languagePhrases?.edges;
  return (
    <Layout extra='' navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={site.showMarquee} marqueeContent={site.marqueeText}>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        <h1><TranslatedTitle translations={page.titles}/></h1>
        <div className="top-text two-column"><BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={page.descriptions}/></div>
      </Container>
    </Layout>
  );
};

export default PageTemplate;
