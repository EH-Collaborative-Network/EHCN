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
  query ResearchThreadTemplateQuery($id: String!) {
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
    sampleResearchThread: sanityResearchThread(id: { eq: $id }) {
      id
      name
      studentLed
      titles{
        text
        language{
          id
          name
          code
        }
      }
      mainLink{
        url
        text
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
      descriptions{
        _rawText
        language{
          id
          code
          name
        }
      }
      credits{
        _rawText
        language{
          id
          code
          name
        }
      }
      media{
        embed{
          embed
          altText
          caption
        }
        pdf{
          altText
          caption
          asset {
            _id
            url
          }
        }
        image{
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
      slug {
        current
      }
      people{
        id
        name
        bios{
          _rawText
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
      learningResources{
        id
        name
        slug{
          current
        }
      }
      newsItems{
        id
        date
        name
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

const ResearchThreadTemplate = props => {
  const { data, errors } = props;
  const researchThread = data && data.sampleResearchThread;
  const site = (data || {}).site;
  const globalLanguages = site.languages;
  const media = researchThread.media;
  const languagePhrases = (data || {}).languagePhrases?.edges;
  return (
    <Layout extra='' navTranslations={languagePhrases} globalLanguages={globalLanguages}>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        <h1><TranslatedTitle translations={researchThread.titles}/></h1>
        <div className="top-text two-column"><BlockContent blocks={researchThread.descriptions}/></div>
        {media.length > 1 &&
           <Carousel media={researchThread.media}/>
        }
      </Container>
    </Layout>
  );
};

export default ResearchThreadTemplate;
