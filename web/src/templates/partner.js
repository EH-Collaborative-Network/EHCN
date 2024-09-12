import React from "react";
import { graphql } from "gatsby";
import Container from "../components/Container/container";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { useLocation } from '@reach/router';
import BlockContent from "../components/TranslationHelpers/block-content";
import Carousel from "../components/Carousel/carousel";
import RelatedBlock from "../components/RelatedBlock/relatedBlock";




export const query = graphql`
  query PartnerTemplateQuery($id: String!) {
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
          newsletter
          learningResources
          availableIn
          search
          news
          relatedCourses
          featuredEvents
          relatedWorkingGroups
          featuredProjects
          relatedLearningResources
          relatedNews
          archive
          currentEvents
          pastEvents
          upcomingEvents
        }
      }
    }
    
    learningResources: allSanityLearningResource(
      filter: {partners: {elemMatch: {id: {eq: $id}}}}
    ){
      edges{
          node {
              partners {
                id
              }
              name
              slug{
                current
              }
              id
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
    workingGroups: allSanityWorkingGroup(
      filter: {partners: {elemMatch: {id: {eq: $id}}}}
    ){
      edges{
          node {
              partners {
                id
              }
              name
              slug{
                current
              }
              id
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
    courses: allSanityCourse(
      filter: {partners: {elemMatch: {id: {eq: $id}}}}
    ){
      edges{
          node {
              partners {
                id
              }
              name
              slug{
                current
              }
              id
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
  site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
    title
    description
    keywords
  }
  partner: sanityPartner(id: { eq: $id }) {
      id
      _id
      name
      mainLink{
        url
        text
      }
      featured_events {
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
        mainImage {
          asset {
            _id
          }
          altText
          caption
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
      featured_projects{
        id
        mainImage {
          asset {
            _id
          }
          altText
          caption
        }
        descriptions{
          _rawText(resolveReferences: { maxDepth: 2 })
          language{
            id
            name
            code
          }
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
      slug {
        current
      }
    }
  }
`;

const PartnerTemplate = props => {
  const { data, errors } = props;
  
  const site = (data || {}).site;
  const workingGroups = (data || {}).workingGroups?.edges;
  const learningResources = (data || {}).learningResources?.edges;
  const courses = (data || {}).courses?.edges;
  const globalLanguages = site.languages;
  const partner = data && data.partner;
  const location = useLocation();

  let fakeNode = {
    "projects": [],
    "events": [],
    "workingGroups": [],
    "courses": [],
    "learningResources":[]
  }
  if(partner.featured_projects?.length > 0){
    fakeNode.projects = partner.featured_projects;
  }
  
  if(partner.featured_events?.length > 0){
    fakeNode.events = partner.featured_events
  }
  
  workingGroups.forEach((n,i)=>{
    fakeNode.workingGroups.push(n.node)
  })
  courses.forEach((n,i)=>{
    fakeNode.courses.push(n.node)
  })
  learningResources.forEach((n,i)=>{
    fakeNode.learningResources.push(n.node)
  })



  const media = partner.media;
  const descriptions = partner.descriptions;
  const languagePhrases = (data || {}).languagePhrases?.edges;
  return (
    <>  
    <Layout extra='' navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={false} marqueeContent={null}>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        <h1>{partner.name}</h1>
        <div className={'subtitle'}><BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={partner.locations}/></div>
        {partner.mainLink?.text?.length > 0 &&
                  <div className={'main-link top-link'}><a className="blue-button" target="_blank" href={partner.mainLink.url}>{partner.mainLink.text}</a></div>
        }
        <div className="top-text one-column partner-page">
          <div>
          <BlockContent globalLanguages={globalLanguages} languagePhrases={languagePhrases} blocks={descriptions}/>
          </div>
          {/* {media.length > 0 &&
            <Carousel media={[media[0]]}/>
          } */}
        </div>
        
        <RelatedBlock featured={true} languagePhrases={languagePhrases} node={fakeNode}/>
      </Container>
    </Layout>
    
  </>
  );
};

export default PartnerTemplate;
