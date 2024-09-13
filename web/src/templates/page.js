import React, {useState} from "react";
import { graphql } from "gatsby";
import Container from "../components/Container/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import Layout from "../containers/layout";
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle";
import BlockContent from "../components/TranslationHelpers/block-content";
import sanityClient from "@sanity/client";
const client = sanityClient({
  projectId: '46orb7yp',
  dataset: 'production',
  apiVersion: '2022-03-25', // use current UTC date - see "specifying API version"!
  token: 'skyfnkmqWJbwvihHkx2GQByHOktPsJB6ztzSRAfi7mZWaQegg23IaNrgFXjSxrBvL5Tli1zygeDqnUMr8QSXOZLNyjjhab5HTPsgD6QnBBxcNBOUwzGyiI69x7lpMKYhxZ94dpxLwIuVRBB1Hn47wR4rPtCpf17JGCYehmiLgCpMZrX1rzZW', // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
})
export const query = graphql`
  query PageTemplateQuery($id: String!) {
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
          newsletter
          code
          archive
          aboutEHCN
          events
          learningResources
          availableIn
          search
        }
      }
    }
    samplePage: sanityPage(id: { eq: $id }) {
      id
      _id
      name
      titles{
        text
        language{
          id
          name
          code
        }
      }
      bodies{
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

const PageTemplate = props => {
  const { data, errors } = props;
  const page = data && data.samplePage;
  let previewQuery = '*[_id == "drafts.'+ page._id +'"]{ _id, titles[]{language->{code}, text}, bodies[]{language->{code}, text}}'
  const location = useLocation();
  let preview = false;
  const [previewData, setPreviewData] = useState(false)
  if(location?.search){
    preview = queryString.parse(location.search).preview;
    
  }
  if(preview && !previewData){
    const fetchData = async () => {
      setPreviewData(await client.fetch(previewQuery).then((data) => {
        return(data[0]);
      }))
    }
    fetchData()
  }
  

  const site = (data || {}).site;
  const globalLanguages = site.languages;
  const languagePhrases = (data || {}).languagePhrases?.edges;
  return (
    <Layout extra='' navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={false} marqueeContent={null}>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>

        <h1><TranslatedTitle translations={(preview && previewData) ? previewData.titles : page.titles}/></h1>
        <div className="top-text one-column"><BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={(preview && previewData) ? previewData.bodies : page.bodies}/></div>
      </Container>
    </Layout>
  );
};

export default PageTemplate;
