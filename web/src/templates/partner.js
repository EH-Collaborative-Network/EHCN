import React, {useState} from "react";
import { graphql } from "gatsby";
import Container from "../components/Container/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import BlockContent from "../components/TranslationHelpers/block-content";
import Carousel from "../components/Carousel/carousel";
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle";
import RelatedBlock from "../components/RelatedBlock/relatedBlock";
import sanityClient from "@sanity/client";
import { Link } from "@reach/router";

const client = sanityClient({
  projectId: '46orb7yp',
  dataset: 'production',
  apiVersion: '2022-03-25', // use current UTC date - see "specifying API version"!
  token: 'skyfnkmqWJbwvihHkx2GQByHOktPsJB6ztzSRAfi7mZWaQegg23IaNrgFXjSxrBvL5Tli1zygeDqnUMr8QSXOZLNyjjhab5HTPsgD6QnBBxcNBOUwzGyiI69x7lpMKYhxZ94dpxLwIuVRBB1Hn47wR4rPtCpf17JGCYehmiLgCpMZrX1rzZW', // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})
export const query = graphql`
  query PartnerTemplateQuery($id: String!) {
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
          news
          relatedCourses
          relatedEvents
          relatedWorkingGroups
          relatedProjects
          relatedResearchThreads
          relatedLearningResources
          relatedPartners
          relatedNews
          currentEvents
          pastEvents
          upcomingEvents
        }
      }
    }
    opps: allSanityOpportunity(
      filter: {applications: {elemMatch: {partner: {id: {eq: $id}}}}}
    ){
      edges{
          node {
              applications {
                text
                url
                partner {
                  id
                  slug {
                    current
                  }
                }
              }
              institution
              title
              id
              titles{
                text
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
                  code
                  name
                }
              }
            }
      }
  }
  site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
    title
    description
    keywords
  }
  partner: sanityPartner(id: { eq: $id }) {
      id
      _id
      mainLink{
        url
        text
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

const PartnerTemplate = props => {
  const { data, errors } = props;
  
  const site = (data || {}).site;
  const opps = (data || {}).opps?.edges;
  const globalLanguages = site.languages;
  const partner = data && data.partner;
  let previewQuery = '*[_id == "drafts.'+ partner._id +'"]{ _id, titles[]{language->{code}, text}, descriptions[]{language->{code}, text}, media[]{image{asset->, caption},embed,pdf{asset->, caption}}}'
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
  const media = partner.media;
  const descriptions = partner.descriptions;
  const languagePhrases = (data || {}).languagePhrases?.edges;
  return (
    <>  
    <Layout extra='' navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={site.showMarquee} marqueeContent={site.marqueeText}>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        <h1>{(preview && previewData) ? previewData.name : partner.name}</h1>
        <div className={'subtitle'}><BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={(preview && previewData) ? previewData.locations : partner.locations}/></div>
        {partner.mainLink?.text?.length > 0 &&
                  <div className={'main-link'}><Link to={partner.mainLink.url}>{partner.mainLink.text}</Link></div>
        }
        <div className="top-text two-column"><BlockContent globalLanguages={globalLanguages} languagePhrases={languagePhrases} blocks={(preview && previewData) ? previewData.descriptions : descriptions}/></div>
        {media.length > 1 &&
           <Carousel media={(preview && previewData) ? previewData.media : media}/>
        }
        <RelatedBlock opps={opps} languagePhrases={languagePhrases} node={partner}/>
      </Container>
    </Layout>
    
  </>
  );
};

export default PartnerTemplate;
