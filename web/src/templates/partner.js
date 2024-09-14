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
          fundingOpportunities
          learningResources
          availableIn
          search
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
    events: allSanityEvent(
      filter: {feature_partners: {elemMatch: {id: {eq: $id}}}}
    ){
      edges{
          node {
              partners {
                id
              }
              name
              mainImage {
                asset {
                  _id
                }
                altText
                caption
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
    projects: allSanityProject(
      filter: {feature_partners: {elemMatch: {id: {eq: $id}}}}
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
              mainImage {
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
    }
  }
`;

const PartnerTemplate = props => {
  const { data, errors } = props;
  
  const site = (data || {}).site;
  const projects = (data || {}).projects?.edges;
  const workingGroups = (data || {}).workingGroups?.edges;
  const learningResources = (data || {}).learningResources?.edges;
  const courses = (data || {}).courses?.edges;
  const events = (data || {}).events?.edges;
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
  projects.forEach((n,i)=>{
    fakeNode.projects.push(n.node)
  })
  events.forEach((n,i)=>{
    fakeNode.events.push(n.node)
  })
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
        <div className="top-text one-column partner-page"><BlockContent globalLanguages={globalLanguages} languagePhrases={languagePhrases} blocks={descriptions}/></div>
        <RelatedBlock featured={true} languagePhrases={languagePhrases} node={fakeNode}/>
      </Container>
    </Layout>
    
  </>
  );
};

export default PartnerTemplate;
