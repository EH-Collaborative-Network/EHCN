import React, {useState} from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import bawh1 from "../components/AQB/bawh1.png"
import bawh2 from "../components/AQB/bawh2.png"
import bawh3 from "../components/AQB/bawh3.png"
import { Link } from "@reach/router";
import yom from "../components/AQB/yom.png"
import yom1 from "../components/AQB/yom1.png"
import yom2 from "../components/AQB/yom2.png"
import yom3 from "../components/AQB/yom3.png"
import yom4 from "../components/AQB/yom4.png"
import olive from "../components/AQB/olive.png"
import hike from "../components/AQB/hike.png"
import showcase from "../components/AQB/showcase.png"
import land from "../components/AQB/land.png"
import exhibition from "../components/AQB/exhibition.png"
import pear from "../components/AQB/pear.png"
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
import * as styles from "../components/AQB/aqb.module.css";
import sanityClient from "@sanity/client";
const client = sanityClient({
  projectId: '46orb7yp',
  dataset: 'production',
  apiVersion: '2022-03-25', // use current UTC date - see "specifying API version"!
  token: 'skyfnkmqWJbwvihHkx2GQByHOktPsJB6ztzSRAfi7mZWaQegg23IaNrgFXjSxrBvL5Tli1zygeDqnUMr8QSXOZLNyjjhab5HTPsgD6QnBBxcNBOUwzGyiI69x7lpMKYhxZ94dpxLwIuVRBB1Hn47wR4rPtCpf17JGCYehmiLgCpMZrX1rzZW', // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})

export const query = graphql`
  query AQBVoicesPageQuery {
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

const AQBVoicesPage = props => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const globalLanguages = site.languages;
 
  const languagePhrases = (data || {}).languagePhrases?.edges;


  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  
  return (
      <>  
      <Layout extra="" navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={false} marqueeContent={null}>
        <SEO title={site.title} description={site.description} keywords={site.keywords} />
        <Container extra={"full-bleed"}>
          <h1 hidden>Welcome to {site.title}</h1>
          <h1 className={styles.h1}>Voices from Al-Quds</h1>
          <div className={styles.bawhWrapper}>
            <div className={styles.chapter + " " + styles.twoUp}>
                <div><img src={bawh1}/></div>
                <div className={styles.textBox}>
                    <h4>BAWH  بوح PODCAST</h4>
                    <p>Bawh بوح is a student-produced podcast based at Al-Quds Bard College in Palestine that  taps into the transformative power of everyday people and their life stories. Every week, the podcast  tunes into Palestine in all its shapes, sizes, sounds and textures..</p>
                    <a className="blue-button" href={"https://bawh.org/"}>Bawh بوح Website</a>
                </div>
            </div>
            <div className={styles.chapter + " " + styles.twoUp + " " +  styles.left}>
                <div className={styles.textBox}>
                    <h4>EP 12: The Dream of the Core</h4>
                    <p>Maya Hrizat offers a love letter to Palestine that seeks to turn a dream into a proposed reality.
<br></br>
مايا حريزات تقدم رسالة حب لفلسطين تسعى لتحويل حلم إلى واقع مقترح.</p>
                    <a className="blue-button" href={"https://bawh.org/episode/12"}>Listen on Bawh بوح</a>
                </div>
                <div><img src={bawh2}/></div>
            </div>
            <div className={styles.chapter + " " + styles.twoUp}>
                <div><img src={bawh3}/></div>
                <div className={styles.textBox}>
                    <h4>EP 8: Just Beyond the Checkpoint</h4>
                    <p>When Mariam Salah ended up on the wrong side of the checkpoint decades ago, she wasn't able to say a final goodbye to her parents or her daughter. Years later, she shares her story with her granddaughter, and together, they begin to heal the wounds of the past.
A warning for our listeners that this episode discusses death and dying.<br></br>
عندما انتهى الأمر بمريم صلاح على الجانب الخطأ من الحاجز منذ عقود ، لم تكن قادرة على توديع والديها أو ابنتها نهائيًا. بعد سنوات ، شاركت قصتها مع حفيدتها ، وبدأوا معًا في تضميد جراح الماضي.
تحذير لمستمعيننا أن هذه الحلقة تناقش الموت والاحتضار.</p>
                    <a className="blue-button" href={"https://bawh.org/episode/8"}>Listen on Bawh بوح</a>
                </div>
            </div>
          </div>
          <div className={styles.yomWrapper}>
            <div className={styles.chapter + " " + styles.twoUp + " " +  styles.left}>
                <div className={styles.textBox}>
                <h1>Land Day / Yom al-Ard / يوم الأرض</h1>
                <p>In commemoration of Yom al-Ard (Land Day), the Division of Humanities and Practicing Arts at Al-Quds Bard College, with support from the Experimental Humanities Collaborative Network (EHCN), hosted events across the month of March 2022 and March 2023 that honored the many shapes and forms in which Palestinians have sustained a powerful counternarrative over and against the Zionist narrative. The events explored how Palestinian experiences and histories have been communicated through creative practices as diverse as oral storytelling, fine arts, photography, digital media, social media, citizen journalism, filmmaking and literature. The symposium builds on the momentum of the Palestinians’ determination to narrate their own lives and experiences across platforms despite ongoing attempts at silencing.</p>
                
                </div>
                <div><img src={yom}/></div> 
            </div>
         
            <div className={styles.chapter + " " + styles.oneUp}>
                <div><img src={olive}/></div> 
                <div className={styles.textBox}>
                <h4>Olive Tree Planting and Biopolitics Lecture</h4>
                <p>Participants learned about the many ways in which Israeli settler colonialism threatens local and longstanding Palestinian olive groves and farms, as well as how Palestinian farmers and their allies are advocating for their rights. Students planted olive trees in support of local farmers, and joined farmers for an outdoor lunch. Facilitated by the <a target="_blank" href="https://www.jai-pal.org/en/">Joint-Advocacy Initiative.</a></p>
                
                </div>
                
            </div>

            <div className={styles.chapter + " " + styles.twoUp + " " +  styles.left}>
                <div className={styles.textBox}>
                <h4>Citizen Journalism & the Poetics of Future Palestine / اعلامو شاعرية الجيل الرابع</h4>
                <p>Activist and Poet Mohammad El-Kurd discussed the role of poetics and citizen journalism in advocating for justice and truth-telling amidst a climate of mis- and dis-information about Palestine. His activism envisions the future at the same time that it intervenes in the present. Q&A moderated by AQB alum, Dalia Alayassa. The featured speaker joined from abroad via video call.</p>
                <Link className={"blue-button " + styles.button} to={'/'}>More Info</Link>
                </div>
                <div><img src={yom1}/></div> 
            </div>


            <div className={styles.chapter + " " + styles.oneUp}>
                <div><img src={hike}/></div> 
                <div className={styles.textBox}>
                <h4>Eco-Hike in Battir/Makhrour and Biodiversity Lecture</h4>
                <p>Participants learned about Palestine's biodiversity and the challenges of conducting environmental research as well as conducting conservation work in the context of the Israeli occupation. Students hiked in a UNESCO world heritage site, and learned about Palestinian farming practices past and present. Facilitated by the Palestine Institute for Biodiversity & Sustainability.</p>
                </div>
                
            </div>


            <div className={styles.chapter + " " + styles.twoUp}>
                <div><img src={yom2}/></div> 
                <div className={styles.textBox}>
                <h4>Resistance and the Arts / الفن المقاوم</h4>
                <p>World renowed artist, Sliman Mansour, discussed the role of the arts in shedding light on the Palestinian movement for liberation as well as inspiring people to keep hope alive. He discussed the narrative arc of his own work from the 1970s until today. Q&A moderated by Rawan Sharaf.</p>
                <Link className={"blue-button " + styles.button} to={'/'}>More Info</Link>
                </div>     
            </div>


            <div className={styles.chapter + " " + styles.oneUp}>
                <div><img src={exhibition}/></div> 
                <div className={styles.textBox}>
                <h4>Exhibition of Palestinian Resistance</h4>
                <p>Student-curated exhibtion that celebrates Palestinian arts and culture. Hosted by Toqa Jawabreh, Urjwan Najjar, Samar Abedrabo, and Hana Ishkirat (AQB Art Committee), Recipients of Student Initiatives Grant.</p>
                </div>
                
            </div>

            <div className={styles.chapter + " " + styles.twoUp + " " + styles.left}>
                <div className={styles.textBox}>
                <h4>Palestinian Identity Through Dance</h4>
                <p>Noora Baker, Head of Production at <a href="https://www.el-funoun.org/" target="_blank">El-Funoun Palestinian Popular Dance Troupe</a>, and member since 1987, discussed the history, vision and mission of El-Funoun, charting its role in reviving Palestinian dance and music folklore since its inception in 1979, as well as in creating new forms of movement and dance that are unique to Palestine.</p>
                <Link className={"blue-button " + styles.button} to={'/'}>More Info</Link>
                </div>     
                <div><img src={yom3}/></div> 
            </div>

            <div className={styles.chapter + " " + styles.twoUp}>
                <div><img src={yom4}/></div> 
                <div className={styles.textBox}>
                <h4>Rooted /متجذرون: Photography Panel and Exhibition</h4>
                <p>Acclaimed photographers Tanya Habjouqa and Wahaj Bani Muflih discussed how they use photography to tell the stories of Palestine and its people. The artists’ work was on exhibition from Sunday, March 27th - Sunday, April 2nd, 2022 at <a target="_blank" href="https://bard.alquds.edu/">Al-Quds Bard College</a>. Tanya Habjouqa joined from abroad via video call.</p>
                <Link className={"blue-button " + styles.button} to={'/'}>More Info</Link>
                </div>     
            </div>
            <div className={styles.chapter + " " + styles.oneUp}>
                <div><img src={pear}/></div> 
                <div className={styles.textBox}>
                <h4>Sakiya Field trip & perky pear workshop</h4>
                <p> Students and professor Mary Diek gathered and went to Sakiya mountain in Ramallah to learn about local agrarian traditions of self- sufficiency, food production, tour the exhibition hall, and explore the intersections of art, science and agriculture. Students also attended a workshop that studies plants specifically the perky pear and how we can use dead perky pear leaves to make shelters and study how we can use the perky pear insect to our benefit since it is commonly spread. While doing that Students enjoyed the company of the Sakiya team and the useful information given by them.</p>
                </div>
                
            </div>

            

          </div>
          <div className={styles.chapter + " " + styles.oneUp}>
                <div><img src={land}/></div> 
                <div className={styles.textBox}>
                <h4>Creative Expression Initiative with  Rami Almufreh & Sara Ayoub</h4>
                <p> The Creative Expression Initiative focuses on catering to the mental health crisis in Palestine through the use of Art Therapy, Meditation, Self-expressive painting, Self-reflection, and the use of connecting nature to the many aspects of our daily lives. The Creative Expression Initiative celebrated Earth Day through a special 2-day event under the title of Resistance through Art Expression and Media Coverage, the first day took place in the AQU garden around the campus area where students gathered natural elements like rocks, sticks, and leaves and showed their appreciation to the Palestinian Earth by reflecting their identities through painting on the natural elements and creating unique are pieces that involve the Palestinian flag colors.</p>
                </div>
            </div>
            <div className={styles.chapter + " " + styles.twoUp}>
                <div><img src={showcase}/></div> 
                <div className={styles.textBox}>
                <h4>AQB Arts Showcase : Kamanjati</h4>
                <p> Al-Quds Bard College Art Showcase at the Kamandjati venue in Ramallah was a vibrant and engaging event that celebrated the artistic talents of students from Al-Quds Bard College. The showcase provided a platform for students to exhibit their diverse range of artworks, including pictures, drawings, </p>
                <Link className={"blue-button " + styles.button} to={'/'}>More Info</Link>
                </div>     
            </div>

            <div className={styles.resourceWrapper}>
                <div className={styles.chapter}>
                <h4>Resources</h4>
                <ul className={"two-column"}>
                    <li><a href="">Lorem Ipsum</a></li>
                    <li><a href="">Lorem Ipsum</a></li>
                    <li><a href="">Lorem Ipsum</a></li>
                    <li><a href="">Lorem Ipsum</a></li>
                    <li><a href="">Lorem Ipsum</a></li>
                    <li><a href="">Lorem Ipsum</a></li>
                    <li><a href="">Lorem Ipsum</a></li>
                    <li><a href="">Lorem Ipsum</a></li>
                    <li><a href="">Lorem Ipsum</a></li>
                    <li><a href="">Lorem Ipsum</a></li>
                    <li><a href="">Lorem Ipsum</a></li>
                    <li><a href="">Lorem Ipsum</a></li>
                </ul>
                </div>
            </div>
        </Container>
      </Layout>
      
    </>
  );
};

export default AQBVoicesPage;
