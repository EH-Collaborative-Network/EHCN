import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import Project from "../components/project";
import SEO from "../components/seo";
import Layout from "../containers/layout";

export const query = graphql`
  query newsItemTemplateQuery($id: String!) {
    sampleNewsItem: sanityNewsItem(id: { eq: $id }) {
      id
      name
      _rawBody
      excerpt
      _rawCredits
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

const NewsItemTemplate = props => {
  const { data, errors } = props;
  const newsItem = data && data.sampleNewsItem;
  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {newsItem && <SEO title={newsItem.title || "Untitled"} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {newsItem && <Project {...newsItem} />}
    </Layout>
  );
};

export default NewsItemTemplate;
