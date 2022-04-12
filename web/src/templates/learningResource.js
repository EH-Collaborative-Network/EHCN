import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import Project from "../components/project";
import SEO from "../components/seo";
import Layout from "../containers/layout";

export const query = graphql`
  query LearningResourceTemplateQuery($id: String!) {
    sampleLearningResource: sanityLearningResource(id: { eq: $id }) {
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
    }
  }
`;

const LearningResourceTemplate = props => {
  const { data, errors } = props;
  const learningResource = data && data.sampleLearningResource;
  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {learningResource && <SEO title={learningResource.title || "Untitled"} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {learningResource && <Project {...learningResource} />}
    </Layout>
  );
};

export default LearningResourceTemplate;
