import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";

export const query = graphql`
  query WorkingGroupTemplateQuery($id: String!) {
    sampleWorkingGroup: sanityWorkingGroup(id: { eq: $id }) {
      id
      name
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
      _rawDescription
      translatedDescriptions{
        _rawText
        language{
          id
          name
        }
      }
      translatedCredits{
        _rawText
        language{
          id
          name
        }
      }
      _rawCredits
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
        }
      }
      slug {
        current
      }
      people{
        id
        name
        _rawBio
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
      }
      researchThreads{
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

const WorkingGroupTemplate = props => {
  const { data, errors } = props;
  const workingGroup = data && data.sampleWorkingGroup;
  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {workingGroup && <SEO title={workingGroup.title || "Untitled"} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {workingGroup && <Project {...workingGroup} />}
    </Layout>
  );
};

export default WorkingGroupTemplate;
