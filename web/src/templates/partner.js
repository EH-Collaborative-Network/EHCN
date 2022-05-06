import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import BlockContent from "../components/block-content";
import Carousel from "../components/carousel";

export const query = graphql`
  query PartnerTemplateQuery($id: String!) {
    opps: allSanityOpportunity(
      filter: {applications: {elemMatch: {partner: {_id: {eq: $id}}}}}
    ){
      edges{
          node {
              applications {
                text
                url
                partner {
                  name
                  slug {
                    current
                  }
                }
              }
              institution
              title
              id
              descriptions{
                _rawText(resolveReferences: { maxDepth: 20 })
                language{
                  id
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
      id
      name
      mainLink{
        url
        text
      }
      descriptions{
        _rawText(resolveReferences: { maxDepth: 20 })
        language{
          id
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
      people{
        id
        name
        bios{
          _rawText(resolveReferences: { maxDepth: 20 })
          language{
            id
            name
          }
        }
        image {
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
      events {
        id
        name
        startDate
        endDate
        _rawDisplayDate
        slug{
          current
        }
      }
      learningResources{
        id
        name
        slug{
          current
        }
      }
      newsItems{
        id
        date
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
      }
      researchThreads{
        id
        name
        slug{
          current
        }
      }
      workingGroups{
        id
        name
        slug{
          current
        }
      }
      courses{
        id
        name
        slug{
          current
        }
      }
    }
  }
`;

const PartnerTemplate = props => {
  const { data, errors } = props;
  
  const site = (data || {}).site;
  const partner = data && data.partner;
  const media = partner.media;
  const descriptions = partner.descriptions;
  return (
    <>  
    <Layout extra='white'>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        <h1>{partner.name}</h1>
        {media.length > 1 &&
           <Carousel media={media}/>
        }
        <div className="top-text two-column"><BlockContent blocks={descriptions}/></div>
      </Container>
    </Layout>
    
  </>
  );
};

export default PartnerTemplate;
