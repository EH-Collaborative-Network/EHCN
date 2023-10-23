import React, {useState} from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import Container from "../components/Container/container";
import BlockContent from "../components/TranslationHelpers/block-content";
import TranslatedTitle from "../components/TranslationHelpers/translatedTitle";
import TranslatedPhrase from "../components/TranslationHelpers/translatedPhrase";
import translate from "../components/TranslationHelpers/translate";
import LangContext from "../components/context/lang";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import Layout from "../containers/layout";
import { FundingOpportunity } from "../components/FundingOpportunity/fundingOpportunity";
import * as styles from "../components/FundingOpportunity/fundingopp.module.css";
import sanityClient from "@sanity/client";
const client = sanityClient({
  projectId: '46orb7yp',
  dataset: 'production',
  apiVersion: '2022-03-25', // use current UTC date - see "specifying API version"!
  token: 'skyfnkmqWJbwvihHkx2GQByHOktPsJB6ztzSRAfi7mZWaQegg23IaNrgFXjSxrBvL5Tli1zygeDqnUMr8QSXOZLNyjjhab5HTPsgD6QnBBxcNBOUwzGyiI69x7lpMKYhxZ94dpxLwIuVRBB1Hn47wR4rPtCpf17JGCYehmiLgCpMZrX1rzZW', // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})

export const query = graphql`
  query FundingPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
      languages {
        name
        code
      }
    }
    partners: allSanityPartner{
      edges{
        node{
          id
          name
          slug{
            current
          }
        }
      }
    }
    languagePhrases: allSanityLanguage {
      edges {
        node {
          name
          code
          aboutEHCN
          calendar
          newsletter
          fundingOpportunities
          ehcnSupported
          learningResources
          researchThreads
          selectInstitution
          availableIn
          search
          application
          availableOpps
          networkWide
        }
      }
    }
    opps: allSanityOpportunity{
        edges{
            node {
                titles{
                  text
                  language{
                    id
                    name
                    code
                  }
                }
                applications {
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
                    code
                  }
                }
              }
        }
    }
    fp: allSanityPage(filter: {slug: {current: {eq: "funding"}}}) {
      edges {
        node {
          id
          _id
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
              name
              code
            }
          }
        }
      }
    }
  }
`;

const FundingPage = props => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }
  const [networkWide, setNetworkWide] = useState(true);
  const [institution, setInstitution] = useState('all');
  const site = (data || {}).site;
  const partners = (data || {}).partners.edges;
  const globalLanguages = site.languages;
  const fp = (data || {}).fp.edges[0]?.node?.bodies;
  let previewQuery = '*[_id == "drafts.'+ (data || {}).fp.edges[0]?.node?._id +'"]{ _id, titles[]{language->{code}, text}, bodies[]{language->{code}, text}}'
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
  const titles = (data || {}).fp.edges[0]?.node?.titles;
  const oppNodes = (data || {}).opps?.edges;
  const languagePhrases = (data || {}).languagePhrases?.edges;
  let institutionOpps = [];
  let networkOpps = [];
  oppNodes.forEach(node => {
    if(node.node.institution){
      if(institution != "all"){
        let includedInsts = []
        node.node.applications?.forEach((app)=>{
          includedInsts.push(app.partner?.name)
        })
        if(includedInsts?.includes(institution)){
          institutionOpps.push(node.node);
        }
      }else{
        institutionOpps.push(node.node);
      }

    }else{
      networkOpps.push(node.node)
    }
  });
  let partnerNames =  [];
  partners.forEach(node =>{
    partnerNames.push(<option value={node.node.name}>{node.node.name}</option>)
  })
  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  function switchInstitution(e){
    let things = document.querySelectorAll(".institution-wrapper > *");
    things.forEach((node) =>{
      node.classList.add("fadey");
      console.log(node.classList)
      setTimeout(function(){
       
        node.classList.remove("fadey")
        setInstitution(e.target.value)
        console.log(node.classList)
      },200)
    })
    
  }
  return (
      <>  
      <Layout extra="" navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={false} marqueeContent={null}>
        <SEO title={site.title} description={site.description} keywords={site.keywords} />
        <Container>
          <h1 hidden>Welcome to {site.title}</h1>
          <h1><TranslatedTitle translations={(preview && previewData) ? previewData.titles : titles}/></h1>
          <div className="top-text one-column"><BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={(preview && previewData) ? previewData.bodies : fp}/></div>
          <div className="funding-opportunities">
          <LangContext.Consumer>
              { theme => {
                  return(
            <label htmlFor='institutionFilter'>{translate(languagePhrases,'selectInstitution',theme)}:</label>
                  )}}
            </LangContext.Consumer>
            <LangContext.Consumer>
              { theme => {
                  return(
                    <select className={styles.instFilter} onChange={switchInstitution} id='institutionFilter'>
                    <option value='all'>
                                      {translate(languagePhrases,'networkWide',theme)}

                                  </option>
                                  {partnerNames}

                    </select>
                  )}} 
              </LangContext.Consumer>
            
            <p style={{'margin-bottom':'0'}}><TranslatedPhrase translations={languagePhrases} phrase={"availableOpps"}/>:</p>
             {
              networkOpps.length == 0 &&
              <em>currently no available opportunities</em>
             }
            <div className={styles.network}>
            {/* <div onClick={handler} className={styles.toggle + " " + "button"}>Show <em>Institution-specific</em> Opportunities instead</div> */}
            <div className={styles.institution + ' institution-wrapper'}>
                  {networkOpps.map(function(node, index){
                    return <FundingOpportunity languagePhrases={languagePhrases} globalLanguages={globalLanguages} key={index} node={node}></FundingOpportunity>;
                  })}
            </div>
            </div>
              {institution != 'all' ?

                    <div className={styles.institution + ' institution-wrapper'}>
                            {/* <div onClick={handler} className={styles.toggle + " " + "button"}>Show <em>Network-wide</em> Opportunities instead</div> */}
                            <div className={styles.wrapper}>
                                {institutionOpps.map(function(node, index){
                                  return <FundingOpportunity languagePhrases={languagePhrases} globalLanguages={globalLanguages} key={index} node={node} institute={institution}></FundingOpportunity>;
                                })}
                            </div>
                          </div>
              : ""}
            

          </div>
        </Container>
      </Layout>
      
    </>
  );
};

export default FundingPage;
