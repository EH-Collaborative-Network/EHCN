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
  query CourseTemplateQuery($id: String!) {
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
          pastEvents
          upcomingEvents
        }
      }
    }
    sampleCourse: sanityCourse(id: { eq: $id }) {
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
      learningResources {
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

    }
  }
`;

const CourseTemplate = props => {
  const { data, errors } = props;
  const site = (data || {}).site;
  const globalLanguages = site.languages;
  const course = data && data.sampleCourse;
  const media = course.media;
  const languagePhrases = (data || {}).languagePhrases?.edges;
  let previewQuery = '*[_id == "drafts.'+ course._id +'"]{ _id, titles[]{language->{code}, text}, descriptions[]{language->{code}, text}, media[]{image{asset->, caption},embed,pdf{asset->, caption}}}'
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
  return (
    <>  
    <Layout extra='' navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={site.showMarquee} marqueeContent={site.marqueeText}>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        <h1><TranslatedTitle translations={(preview && previewData) ? previewData.titles : course.titles}/></h1>
        <div className="top-text two-column"><BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={(preview && previewData) ? previewData.descriptions : course.descriptions}/></div>
        {media.length > 1 &&
           <Carousel media={(preview && previewData) ? previewData.media : course.media}/>
        }
        <RelatedBlock opps={""} languagePhrases={languagePhrases} node={course}/>
      </Container>
    </Layout>
    
    </>
  );
};

export default CourseTemplate;
