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
  query newsItemTemplateQuery($id: String!) {
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
    sampleNewsItem: sanityNewsItem(id: { eq: $id }) {
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
      credits{
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
      people{
        id
        name
        bios{
          _rawText(resolveReferences: { maxDepth: 20 })
          language{
            id
            code
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
      events {
        id
        name
        startDate
        endDate
        _rawDisplayDate
        slug{
          current
        }
      }
      partners{
        id
        name
        slug{
          current
        }
      }
      projects{
        id
        name
        slug{
          current
        }
      }
      researchThreads{
        id
        name
        slug{
          current
        }
      }
      workingGroups{
        id
        name
        slug{
          current
        }
      }
      courses{
        id
        name
        slug{
          current
        }
      }
    }
  }
`;

const NewsItemTemplate = props => {
  const { data, errors } = props;
  const site = (data || {}).site;
  const globalLanguages = site.languages;
  const newsItem = data && data.sampleNewsItem;
  const languagePhrases = (data || {}).languagePhrases?.edges;
  return (
    <Layout extra='' navTranslations={languagePhrases} globalLanguages={globalLanguages}>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        <h1><TranslatedTitle translations={newsItem.titles} /></h1>
        <div className="top-text two-column"><BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={newsItem.bodies}/></div>
      </Container>
    </Layout>
  );
};

export default NewsItemTemplate;
