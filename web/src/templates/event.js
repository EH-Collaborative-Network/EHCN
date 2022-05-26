import React, { useState }  from "react";
import { graphql } from "gatsby";
import Container from "../components/Container/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle";
// import Carousel from "../components/Carousel/carousel";
import Masonry from "../components/Masonry/Masonry";
import BlockContent from "../components/TranslationHelpers/block-content";
import RelatedBlock from "../components/RelatedBlock/relatedBlock";
import DisplayTime from "../components/Time/displayTime";
import TimeZoneList from "../components/Time/timeZoneList";
import * as styles from "../components/Time/time.module.css";
import TranslatedPhrase from "../components/TranslationHelpers/translatedPhrase";
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
          locale
          name
        }
      }
      languages {
        name
        code
        locale
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
          locale
          timezone
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
      timeZone{
        name
        offset
      }
      startDate{
        date
        time
      }
      endDate{
        date
        time
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
        caption
      }
      descriptions{
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
          caption
        }
      }
      slug {
        current
      }
      events {
        id
        name
        timeZone{
          name
          offset
        }
        startDate{
          date
          time
        }
        endDate{
          date
          time
        }
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
  const [offset, setOffset] = useState(null);
  function handleTime(e){
    let value = e.target.value;
    if(value){
      let value = parseInt(value);
    }
    setOffset(value);
  }
  return (
    <Layout extra='' navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={site.showMarquee} marqueeContent={site.marqueeText}>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        <h1><TranslatedTitle translations={event.titles}/></h1>
        <div className={styles.timeWrapper}>
          <p><DisplayTime event={event} offset={offset} languagePhrases={languagePhrases}/></p>
          <div>
            <label for="change-tz">{<TranslatedPhrase translations={languagePhrases} phrase={'timezone'}/>}:</label>
            <select id="change-tz" onChange={handleTime}>
              <TimeZoneList />
            </select>
          </div>
        </div>
        <div className="top-text two-column"><BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={event.descriptions}/></div>
        {media.length > 1 &&
           <Masonry media={event.media}/>
        }
        <RelatedBlock opps={""} languagePhrases={languagePhrases} node={event}/>
      </Container>
    </Layout>
  );
};

export default EventTemplate;
