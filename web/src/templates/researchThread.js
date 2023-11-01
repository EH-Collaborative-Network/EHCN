import React, {useState} from "react";
import { graphql } from "gatsby";
import Container from "../components/Container/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle";
import Carousel from "../components/Carousel/carousel";
import BlockContent from "../components/TranslationHelpers/block-content";
import RelatedBlock from "../components/RelatedBlock/relatedBlock";
import sanityClient from "@sanity/client";
const client = sanityClient({
  projectId: '46orb7yp',
  dataset: 'production',
  apiVersion: '2022-03-25', // use current UTC date - see "specifying API version"!
  token: 'skyfnkmqWJbwvihHkx2GQByHOktPsJB6ztzSRAfi7mZWaQegg23IaNrgFXjSxrBvL5Tli1zygeDqnUMr8QSXOZLNyjjhab5HTPsgD6QnBBxcNBOUwzGyiI69x7lpMKYhxZ94dpxLwIuVRBB1Hn47wR4rPtCpf17JGCYehmiLgCpMZrX1rzZW', // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})
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
          events
          fundingOpportunities
          ehcnSupported
          learningResources
          archive
          researchThreads
          availableIn
          search
          relatedCourses
          relatedEvents
          relatedWorkingGroups
          relatedProjects
          relatedResearchThreads
          relatedLearningResources
          newsletter
          relatedPartners
          relatedNews
          studentLed
          facultyLed
          pastEvents
          currentEvents
          upcomingEvents
        }
      }
    }
    sampleResearchThread: sanityResearchThread(id: { eq: $id }) {
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
      descriptions{
        _rawText
        language{
          id
          code
          name
        }
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
      events{
        id
        studentLed
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
        titles{
          text
          language{
            id
            name
            code
          }
        }
        slug{
          current
        }
      }
      workingGroups{
        id
        studentLed
        titles{
          text
          language{
            id
            name
            code
          }
        }
        slug{
          current
        }
      }
      projects{
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
        slug{
          current
        }
      }
      courses{
        id
        titles{
          text
          language{
            id
            name
            code
          }
        }
        slug{
          current
        }
      }
      learningResources{
        id
        titles{
          text
          language{
            id
            name
            code
          }
        }
        slug{
          current
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
    }
  }
`;

const ResearchThreadTemplate = props => {
  const { data, errors } = props;
  const researchThread = data && data.sampleResearchThread;
  let previewQuery = '*[_id == "drafts.'+ researchThread._id +'"]{ _id, titles[]{language->{code}, text}, descriptions[]{language->{code}, text}, media[]{image{asset->, caption},embed,pdf{asset->, caption}}}'
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
  const site = (data || {}).site;
  const globalLanguages = site.languages;
  const media = researchThread.media;
  const languagePhrases = (data || {}).languagePhrases?.edges;
  return (
    <Layout extra='' navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={false} marqueeContent={null}>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        <h1><TranslatedTitle translations={(preview && previewData) ? previewData.titles : researchThread.titles}/></h1>
        <div className="top-text one-column"><BlockContent blocks={(preview && previewData) ? previewData.descriptions : researchThread.descriptions}/></div>
        {media.length > 0 &&
           <Carousel media={(preview && previewData) ? previewData.media : researchThread.media}/>
        }
        <RelatedBlock opps={""} languagePhrases={languagePhrases} node={researchThread}/>
      </Container>
    </Layout>
  );
};

export default ResearchThreadTemplate;
