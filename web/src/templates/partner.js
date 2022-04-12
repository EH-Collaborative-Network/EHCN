import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import Project from "../components/project";
import SEO from "../components/seo";
import Layout from "../containers/layout";

export const query = graphql`
  query PartnerTemplateQuery($id: String!) {
    samplePartner: sanityPartner(id: { eq: $id }) {
      id
      id
      name
      mainLink{
        url
        text
      }
      _rawDescription
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

const PartnerTemplate = props => {
  const { data, errors } = props;
  const partner = data && data.samplePartner;
  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {partner && <SEO title={partner.title || "Untitled"} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {partner && <Project {...partner} />}
    </Layout>
  );
};

export default PartnerTemplate;
