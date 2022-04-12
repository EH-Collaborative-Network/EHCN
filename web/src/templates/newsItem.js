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
