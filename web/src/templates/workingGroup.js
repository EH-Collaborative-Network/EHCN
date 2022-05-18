import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import TranslatedTitle from "../components/translatedTitle";
import Carousel from "../components/carousel";

export const query = graphql`
  query WorkingGroupTemplateQuery($id: String!) {
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
    sampleWorkingGroup: sanityWorkingGroup(id: { eq: $id }) {
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

const WorkingGroupTemplate = props => {
  const { data, errors } = props;
  const workingGroup = data && data.sampleWorkingGroup;
  const site = (data || {}).site;
  const media = workingGroup.media;
  const globalLanguages = site.languages;
  const languagePhrases = (data || {}).languagePhrases?.edges;
  return (
    <Layout extra='' navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={site.showMarquee} marqueeContent={site.marqueeText}>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        <h1><TranslatedTitle translations={workingGroup.titles}/></h1>
        <div className="top-text two-column"><BlockContent blocks={workingGroup.descriptions}/></div>
        {media.length > 1 &&
          <Carousel media={workingGroup.media}/>
        }
      </Container>
    </Layout>
  );
};

export default WorkingGroupTemplate;
