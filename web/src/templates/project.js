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
import Masonry from "../components/Masonry/Masonry";
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
  query ProjectTemplateQuery($id: String!) {
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
          learningResources
          availableIn
          newsletter
          search
          relatedCourses
          relatedEvents
          relatedWorkingGroups
          relatedProjects
          relatedLearningResources
          relatedPartners
          relatedNews
          studentLed
          facultyLed
          pastEvents
          archive
          currentEvents
          upcomingEvents
        }
      }
    }
    sampleProject: sanityProject(id: { eq: $id }) {
      id
      _id
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
      subtitles{
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
      events {
        id
        timeZone{
          name
          offset
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
        descriptions{
          _rawText(resolveReferences: { maxDepth: 20 })
          language{
            id
            name
            code
          }
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
      partners{
        id
        name
        slug{
          current
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

const ProjectTemplate = props => {
  const { data, errors } = props;
  const project = data && data.sampleProject;
  let previewQuery = '*[_id == "drafts.'+ project._id +'"]{ _id, titles[]{language->{code}, text}, descriptions[]{language->{code}, text}, media[]{image{asset->, caption},embed,pdf{asset->, caption}}}'
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
  const media = project.media;
  const site = (data || {}).site;
  const globalLanguages = site.languages;
  const languagePhrases = (data || {}).languagePhrases?.edges;
  return (
    <Layout extra='' navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={false} marqueeContent={null}>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        <h1><TranslatedTitle translations={(preview && previewData) ? previewData.titles : project.titles}/></h1>
        <div className={'subtitle'}><TranslatedTitle translations={(preview && previewData) ? previewData.subtitles : project.subtitles}/></div>
        <div className={'subtitle'}><TranslatedPhrase translations={languagePhrases} phrase={project.studentLed ? 'studentLed' : 'facultyLed'}/></div>
        <div className="top-text one-column"><BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={(preview && previewData) ? previewData.descriptions : project.descriptions}/></div>
        {project.mainLink?.text?.length > 0 &&
                  <div className={'main-link'}><a className="blue-button" target="_blank" href={project.mainLink.url}>{project.mainLink.text}</a></div>
        }

 
        {media.length > 0 &&
           <Masonry media={(preview && previewData) ? previewData.media : project.media}/>
        }
        <RelatedBlock opps={""} languagePhrases={languagePhrases} node={project}/>
      </Container>
    </Layout>
  );
};

export default ProjectTemplate;
