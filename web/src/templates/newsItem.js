import React, {useState} from "react";
import { graphql } from "gatsby";
import Container from "../components/Container/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import Layout from "../containers/layout";
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle";
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
  query newsItemTemplateQuery($id: String!) {
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
          currentEvents
          upcomingEvents
        }
      }
    }
    sampleNewsItem: sanityNewsItem(id: { eq: $id }) {
      id
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
    }
  }
`;

const NewsItemTemplate = props => {
  const { data, errors } = props;
  const site = (data || {}).site;
  const globalLanguages = site.languages;
  const newsItem = data && data.sampleNewsItem;
  let previewQuery = '*[_id == "drafts.'+ newsItem._id +'"]{ _id, titles[]{language->{code}, text}, bodies[]{language->{code}, text}}'
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
  const languagePhrases = (data || {}).languagePhrases?.edges;
  return (
    <Layout extra='' navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={site.showMarquee} marqueeContent={site.marqueeText}>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        <h1><TranslatedTitle translations={(preview && previewData) ? previewData.titles : newsItem.titles} /></h1>
        <div className="top-text two-column"><BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={(preview && previewData) ? previewData.bodies : newsItem.bodies}/></div>
        <RelatedBlock opps={""} languagePhrases={languagePhrases} node={newsItem}/>
      </Container>
    </Layout>
  );
};

export default NewsItemTemplate;
