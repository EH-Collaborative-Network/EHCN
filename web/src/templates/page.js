import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import Project from "../components/project";
import SEO from "../components/seo";
import Layout from "../containers/layout";

export const query = graphql`
  query PageTemplateQuery($id: String!) {
    samplePage: sanityPage(id: { eq: $id }) {
      id
      id
      name
      _rawBody
      slug {
        current
      }
    }
  }
`;

const PageTemplate = props => {
  const { data, errors } = props;
  const page = data && data.samplePage;
  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {page && <SEO title={page.title || "Untitled"} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {page && <Project {...page} />}
    </Layout>
  );
};

export default PageTemplate;
