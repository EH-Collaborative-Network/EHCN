import React, { useState }  from "react";
import { graphql } from "gatsby";
import Container from "../components/Container/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle";
// import Carousel from "../components/Carousel/carousel";
import Masonry from "../components/Masonry/Masonry";
import BlockContent from "../components/TranslationHelpers/block-content";
import RelatedBlock from "../components/RelatedBlock/relatedBlock";
import DisplayTime from "../components/Time/displayTime";
import TimeZoneList from "../components/Time/timeZoneList";
import * as styles from "../components/Time/time.module.css";
import TranslatedPhrase from "../components/TranslationHelpers/translatedPhrase";
import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: '46orb7yp',
  dataset: 'production',
  apiVersion: '2022-03-25', // use current UTC date - see "specifying API version"!
  token: 'skyfnkmqWJbwvihHkx2GQByHOktPsJB6ztzSRAfi7mZWaQegg23IaNrgFXjSxrBvL5Tli1zygeDqnUMr8QSXOZLNyjjhab5HTPsgD6QnBBxcNBOUwzGyiI69x7lpMKYhxZ94dpxLwIuVRBB1Hn47wR4rPtCpf17JGCYehmiLgCpMZrX1rzZW', // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})
export const query = graphql`
  query EventTemplateQuery($id: String!) {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
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
          newsletter
          calendar
          fundingOpportunities
          ehcnSupported
          learningResources
          researchThreads
          availableIn
          search
          relatedCourses
          archive
          relatedEvents
          relatedWorkingGroups
          relatedProjects
          relatedResearchThreads
          relatedLearningResources
          relatedPartners
          relatedNews
          locale
          timezone
          studentLed
          facultyLed
          pastEvents
          currentEvents
          upcomingEvents
        }
      }
    }
    sampleEvent: sanityEvent(id: { eq: $id }) {
      id
      _id
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
      subtitles{
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
      mainImage {
        crop {
          _key
          _type
          top
          bottom
          left
          right
        }
        asset {
          _id
        }
        altText
        caption
      }
      locations{
        _rawText(resolveReferences: { maxDepth: 20 })
        language{
          id
          name
          code
        }
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
  const languagePhrases = (data || {}).languagePhrases?.edges;
  const location = useLocation();
  const media = event.media;
  const [previewData, setPreviewData] = useState(false)
  let preview = false;
  let previewQuery = '*[_id == "drafts.'+ event._id +'"]{ _id, titles[]{language->{code}, text}, descriptions[]{language->{code}, text}, media[]{image{asset->, caption},embed,pdf{asset->, caption}}, startDate, endDate, timeZone->}'
  let currentOffset = null;
  currentOffset = parseInt(event.timeZone?.offset)
  const [offset, setOffset] = useState(currentOffset);
  let showTz = false;
  if(event.startDate.date == event.endDate.date){
    showTz = true;
  }
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
  
  
  
  
  function handleTime(e){
    let value = e.target.value;
    if(value){
      let value = parseInt(value);
    }
    setOffset(value);
  }
  return (
    <Layout extra='' navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={false} marqueeContent={null}>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        <h1><TranslatedTitle translations={(preview && previewData) ? previewData.titles : event.titles}/></h1>
        <div className={'subtitle'}><TranslatedTitle translations={(preview && previewData) ? previewData.subtitles : event.subtitles}/></div>
          {showTz ?
          <>
          <div className={styles.timeWrapper}>
            <div className={'subtitle'}>
              <label htmlFor="change-tz">{<TranslatedPhrase translations={languagePhrases} phrase={'timezone'}/>}:</label>
              <select id="change-tz" onChange={handleTime}>
                <TimeZoneList val={currentOffset} txt={event.timeZone?.name}/>
              </select>
            </div>
            <div><TranslatedPhrase translations={languagePhrases} phrase={event.studentLed ? 'studentLed' : 'facultyLed'}/></div>
          </div>
          <div class={'subtitle'}>
            {(event.timeZone && event.startDate) &&
              <DisplayTime event={(preview && previewData) ? event : event} offset={offset} languagePhrases={languagePhrases}/>
            }
          </div>
            </> :
            <>
            <div className={styles.timeWrapper}>
              <div className={'subtitle'}>
              {(event.timeZone && event.startDate) &&
                <DisplayTime event={(preview && previewData) ? event : event} offset={offset} languagePhrases={languagePhrases}/>
              }</div>
              <div><TranslatedPhrase translations={languagePhrases} phrase={event.studentLed ? 'studentLed' : 'facultyLed'}/></div>
            </div>
       
              </>

            }
   
        <div className={'subtitle'}><BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={(preview && previewData) ? previewData.locations : event.locations}/></div>
        {event.mainLink?.text?.length > 0 &&
                  <div className={'main-link '+ styles.ml}><a target="_blank" href={event.mainLink.url}>{event.mainLink.text}</a></div>
        }
        <div className="top-text one-column"><BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={(preview && previewData) ? previewData.descriptions : event.descriptions}/></div>
        {media.length > 0 &&
           <Masonry media={(preview && previewData) ? previewData.media : event.media}/>
        }
        <RelatedBlock opps={""} languagePhrases={languagePhrases} node={event}/>
      </Container>
    </Layout>
  );
};

export default EventTemplate;
