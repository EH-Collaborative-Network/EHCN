import React, {useState} from "react";
import { graphql } from "gatsby";
import Container from "../components/Container/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import TranslatedPhrase from "../components/TranslationHelpers/translatedPhrase";
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle";
import BlockContent from "../components/TranslationHelpers/block-content";
import Carousel from "../components/Carousel/carousel";
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
          studentLed
          facultyLed
          pastEvents
          currentEvents
          upcomingEvents
        }
      }
    }
    sampleWorkingGroup: sanityWorkingGroup(id: { eq: $id }) {
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
      descriptions{
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

const WorkingGroupTemplate = props => {
  const { data, errors } = props;
  const workingGroup = data && data.sampleWorkingGroup;
  let previewQuery = '*[_id == "drafts.'+ workingGroup._id +'"]{ _id, titles[]{language->{code}, text}, descriptions[]{language->{code}, text}, media[]{image{asset->, caption},embed,pdf{asset->, caption}}}'
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
  const media = workingGroup.media;
  const globalLanguages = site.languages;
  const languagePhrases = (data || {}).languagePhrases?.edges;
  return (
    <Layout extra='' navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={site.showMarquee} marqueeContent={site.marqueeText}>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        <h1><TranslatedTitle translations={(preview && previewData) ? previewData.titles : workingGroup.titles}/></h1>
        <div className={'subtitle'}><TranslatedPhrase translations={languagePhrases} phrase={workingGroup.studentLed ? 'studentLed' : 'facultyLed'}/></div>
        <div className="top-text two-column"><BlockContent blocks={(preview && previewData) ? previewData.descriptions : workingGroup.descriptions}/></div>
        {workingGroup.mainLink?.text?.length > 0 &&
                  <div className={'main-link'}><a target="_blank" href={workingGroup.mainLink.url}>{workingGroup.mainLink.text}</a></div>
        }
        {media.length > 1 &&
          <Carousel media={(preview && previewData) ? previewData.media : workingGroup.media}/>
        }
        <RelatedBlock opps={""} languagePhrases={languagePhrases} node={workingGroup}/>
      </Container>
    </Layout>
  );
};

export default WorkingGroupTemplate;
