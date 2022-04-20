import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";

export const query = graphql`
  query CourseTemplateQuery($id: String!) {
    sampleCourse: sanityCourse(id: { eq: $id }) {
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
        translatedBios{
          _rawText
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
      learningResources {
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
      workingGroups{
        id
        name
        slug{
          current
        }
      }

    }
  }
`;

const CourseTemplate = props => {
  const { data, errors } = props;
  const course = data && data.sampleCourse;
  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {course && <SEO title={course.title || "Untitled"} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {course && <Project {...course} />}
    </Layout>
  );
};

export default CourseTemplate;
