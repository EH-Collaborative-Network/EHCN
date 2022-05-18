import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import TranslatedTitle from "../components/translatedTitle";
import Carousel from "../components/carousel";
import BlockContent from "../components/block-content";
import RelatedBlock from "../components/relatedBlock";
export const query = graphql`
  query EventTemplateQuery($id: String!) {
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
          relatedCourses
          relatedEvents
          relatedWorkingGroups
          relatedProjects
          relatedResearchThreads
          relatedLearningResources
          relatedPartners
          relatedNews
        }
      }
    }
    sampleEvent: sanityEvent(id: { eq: $id }) {
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
      startDate
      endDate
      _rawDisplayDate
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
        _rawText(resolveReferences: { maxDepth: 20 })
        language{
          id
          name
          code
        }
      }
      credits{
        _rawText(resolveReferences: { maxDepth: 20 })
        language{
          id
          name
          code
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
            url
            _id
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
        titles{
          text
          language{
            id
            name
            code
          }
        }
      }
      learningResources{
        id
        name
        slug{
          current
        }
        titles{
          text
          language{
            id
            name
            code
          }
        }
      }
      newsItems{
        id
        date
        name
        slug{
          current
        }
        titles{
          text
          language{
            id
            name
            code
          }
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
        titles{
          text
          language{
            id
            name
            code
          }
        }
      }
      researchThreads{
        id
        name
        slug{
          current
        }
        titles{
          text
          language{
            id
            name
            code
          }
        }
      }
      workingGroups{
        id
        name
        slug{
          current
        }
        titles{
          text
          language{
            id
            name
            code
          }
        }
      }
      courses{
        id
        name
        slug{
          current
        }
        titles{
          text
          language{
            id
            name
            code
          }
        }
      }
    }
  }
`;

const EventTemplate = props => {
  const { data, errors } = props;
  const site = (data || {}).site;
  const globalLanguages = site.languages;
  const event = data && data.sampleEvent;
  const media = event.media;
  const languagePhrases = (data || {}).languagePhrases?.edges;

  return (
    <Layout extra='' navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={site.showMarquee} marqueeContent={site.marqueeText}>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        <h1><TranslatedTitle translations={event.titles}/></h1>
        <div className="top-text two-column"><BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={event.descriptions}/></div>
        {media.length > 1 &&
           <Carousel media={event.media}/>
        }
        <RelatedBlock opps={opps} languagePhrases={languagePhrases} node={event}/>
      </Container>
    </Layout>
  );
};

export default EventTemplate;
