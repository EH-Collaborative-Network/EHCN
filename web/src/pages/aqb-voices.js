import React, {useState} from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import mansour from "../components/AQB/mansour.mp3"
import bawh1 from "../components/AQB/bawh1.png"
import { Link } from "@reach/router";
import yom from "../components/AQB/yom.png"
import yom1 from "../components/AQB/yom1.png"
import yom2 from "../components/AQB/yom2.png"
import muflih from "../components/AQB/muflih.png"
import yom3 from "../components/AQB/yom3.png"
import olive from "../components/AQB/olive.png"
import hike from "../components/AQB/hike.png"
import showcase from "../components/AQB/showcase.jpg"
import land from "../components/AQB/land.png"
import sakiye from "../components/AQB/sakiye.jpg"
import jericho from "../components/AQB/jericho.jpg"
import heirloom from "../components/AQB/heirloom.jpg"
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
          archive
          newsletter
          fundingOpportunities
          learningResources
          events
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
                    <p>Bawh بوح is a student-produced podcast based at Al-Quds Bard College in Palestine that  taps into the transformative power of everyday people and their life stories. Every week, the podcast  tunes into Palestine in all its shapes, sizes, sounds and textures.</p>
                    <a className="blue-button" href={"https://bawh.org/"}>Bawh بوح Website</a>
                </div>
            </div>
            <div className={styles.chapter + " " + styles.twoUp + " " +  styles.left}>
                <div className={styles.textBox}>
                    <h4>The Awakening (2021, 22min) dir. Elias Amro, Omayma Sbeih, Yazan Oweineh, Tala Salem, Amir Al Qadi</h4>
                    <p>
Amidst the uprising of 2021 when the Israeli government attempted to evict six families from occupied East Jerusalem, five students express what it means to strive for freedom.</p>
                </div>
                <div><iframe src="https://drive.google.com/file/d/1RIBV2-pYT6FUYKE25szdmlahtLW3bV7R/preview"  allow="fullscreen"></iframe></div>
            </div>
            <div className={styles.chapter + " " + styles.twoUp}>
                <div><iframe src="https://drive.google.com/file/d/1ZVeWZSM2MgDyn0L792vwZKxxqEaJCKqH/preview"  allow="fullscreen"></iframe></div>
                <div className={styles.textBox}>
                    <h4>Freedom is Worth Everything (2022, 14min) dir. Hazar Alatrash & Amr Hussein</h4>
                    <p>Two young women share their experiences after their education is cut short by
political imprisonment.</p>
                </div>
            </div>
         

          {/* <div className={styles.chapter + " " + styles.twoUp + " " +  styles.left}>
                <div className={styles.textBox}>
                    <h4>The Unwanted Path (2021, 40min) dir. Yazan Iwaina</h4>
                    <p>
                    Through the intertwined, but polar perspectives of a Palestinian worker and his son, the film immerses viewers into the physical and emotional realities of laboring in Israel. </p>
                </div>
                <div><img src={bawh2}/></div>
            </div> */}
            
            <div className={styles.chapter + " " + styles.twoUp + " " +  styles.left}>
                <div className={styles.textBox}>
                    <h4>The Struggle of an ID Card (2022, 8min) dir. Hind al-Kassis, Zaina al-Khatib, Razan Hamdan</h4>
                    <p>
                    A Palestinian couple holding two different occupation IDs marry and give birth to
a child who is rendered stateless as a result. Twenty-six years later, she still has
no identity. This is her story.</p>
                </div>
                <div><iframe src="https://drive.google.com/file/d/1lTL64ocLKr-QyF7CfPAjP59pBQUcT0CR/preview"  allow="fullscreen"></iframe></div>
            </div>

            <div className={styles.chapter + " " + styles.twoUp}>
                <div><iframe src="https://drive.google.com/file/d/1kqagUksUgTYgVSpWZnV4qPMDn6RokdJb/preview"  allow="fullscreen"></iframe></div>
                <div className={styles.textBox}>
                    <h4>حب أزرق و أخضر / The Highway (2020, 26min) dir. Afnan Abassi</h4>
                    <p>Love, loss and resilience.</p>
                </div>
            </div>
            <div className={styles.chapter + " " + styles.twoUp + " "+ styles.left}>
                <div className={styles.textBox}>
                    <h4>Occupied Workers (2022, 10min) dir. Layan Dajani & Rana Hadieh</h4>
                    <p>This is the story of two Palestinians who cross occupation checkpoints every day
to make ends meet. How do they survive the daily hardships? What makes them
persevere?</p>
                </div>
                <div><iframe src="https://drive.google.com/file/d/1rlCYL5O0LCP0pE4BDm8f3pyC78XTNXQF/preview"  allow="autoplay"></iframe></div>

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
                </div>
                <div><img src={yom1}/></div> 
            </div>


            <div className={styles.chapter + " " + styles.oneUp}>
                <div><img src={hike}/></div> 
                <div className={styles.textBox}>
                <h4>Eco Hikes:</h4>
                <p>As of 2021, 61% of Palestinian land in the West Bank is “off limits” for Palestinian use. This does not include the 150 illegal Israeli settlements and 128 illegal Israeli outposts that have been established in the West Bank since 1967. Furthermore, there are 593 Israeli roadblocks and checkpoints obstructing Palestinian movement in the West Bank, most of them aimed to protect illegal Israeli settlers. These realities on the ground make it very difficult for Palestinians to enjoy and learn about their local ecology. Many young Palestinians would never venture out on a hike alone, since they could be attacked at any time by Israeli settlers or detained by Israeli Forces. Every year, AQB “takes back” these ecological spaces by offering guided group hikes that allow students to learn about the flora and fauna of their homeland safely. (Sources: UN OCHA Area C, 2021; “Report on UNCTAD Assistance to the Palestinian People: Developments in the Economy of the Occupied Palestinian Territory” Aug 2020; UN OCHA “Occupied Palestinian Territory (oPt) Humanitarian Needs Overview 2021” Dec 2020).</p>
                </div>
                
            </div>

            <div className={styles.chapter + " " + styles.twoUp}>
                <div><img src={heirloom}/></div> 
                <div className={styles.textBox}>
                <h4>Hike in Battir & Visit to Palestine Heirloom Seed Library and Dar Yusif Nasri Jacir for Art and Research</h4>
                <p>March 16th, 2023<br></br>Students learned about Palestine’s biodiversity and the struggle to protect and cultivate Palestine’s heirloom seeds and olive groves. Participants hiked (6 km) in a UNESCO world heritage site, and learned about Palestinian farming practices, past and present. Facilitated by the Palestine Heirloom Seed Library and Dar Yusuf Nasri Jacir for Art and Research.</p>
                </div>
                
            </div>
            <div className={styles.chapter + " " + styles.oneUp}>
                <div><img src={jericho}/></div> 
                <div className={styles.textBox}>
                <h4>Hike from Jericho to Sea Level</h4>
                <p>March 21st, 2023<br></br>Students embarked on a beautiful 16 kilometer hike through Wadi Qelt, where they had a chance to learn about the ruins of King Herod’s winter palace, the rocky canyon Deir al-Qelt (St. George’s Monastery), the Roman aqueduct, the Jordan Valley, and the historic road from Jericho to Jerusalem and back to sea level. Students not only get a chance to bask in Palestine’s nature, but also learned about how the Palestine Heritage Trail is supporting Palestinian heritage, arts and culture along the trail. Students also had a chance to view Jericho’s agricultural diversity from above on the cable car. Hosted by Palestine Heritage Trail.</p>
                </div>
            </div>


            <div className={styles.chapter + " " + styles.twoUp}>
                <div>
                <img src={yom2}/>
                
                
                </div> 
                <div className={styles.textBox}>
                <h4>Resistance and the Arts / الفن المقاوم</h4>
                <p>World renowed artist, Sliman Mansour, discussed the role of the arts in shedding light on the Palestinian movement for liberation as well as inspiring people to keep hope alive. He discussed the narrative arc of his own work from the 1970s until today. Q&A moderated by Rawan Sharaf.</p>
                <figcaption>Sliman Mansour interviewed by Noor Sada:</figcaption>
                <audio controls>
                  <source src={mansour} type="audio/mpeg"/>
                Your browser does not support the audio element.
                </audio>
                </div>     

            </div>


            <div className={styles.chapter + " " + styles.oneUp}>
                <div></div> 
                <div className={styles.textBox}>
                <h4>Inaugural Shireen Abu Akleh Senior Project Grant</h4>
                <p>In memory of Shireen Abu Akleh’s life and work, the Humanities and Practicing Arts Division at Al-Quds Bard College inaugurated the first annual “Shireen Abu Akleh Senior Project Grant.” The grant provides awardees with modest financial support to complete SP projects that are in the spirit of Ms. Abu Akleh’s commitment to “boldly tell the story of the diversity and magnitude of the human experience.”
                  <ul>
                    <li>“Colonized Nightmares” by Layan Dajani (Hybrid Live Action/Animated Film)</li>
                    <li>“Rhythm of Resilience” by Miral Abualia (Non-fiction Film)</li>
                    <li>“Cultural Norms, Legal Prosecution, and Sexual Assault in Palestine” by Omayma Sbeih (Narrative Podcast Series)</li>
                    <li>“Tip of My Tongue” by Zaina al-Khatib (Poetry Collection & Film Essay)</li>

                  </ul>
                </p>
                </div>
                
            </div>

            <div className={styles.chapter + " " + styles.twoUp + " " + styles.left}>
                <div className={styles.textBox}>
                <h4>Palestinian Identity Through Dance</h4>
                <p>Noora Baker, Head of Production at <a href="https://www.el-funoun.org/" target="_blank">El-Funoun Palestinian Popular Dance Troupe</a>, and member since 1987, discussed the history, vision and mission of El-Funoun, charting its role in reviving Palestinian dance and music folklore since its inception in 1979, as well as in creating new forms of movement and dance that are unique to Palestine.</p>
                </div>     
                <div><img src={yom3}/>
                  
                </div> 
            </div>

            <div className={styles.chapter + " " + styles.oneUp}>
                <div><img src={muflih}/> <figcaption>Photograph by Wahaj Bani Muflih</figcaption>  </div> 
                <div className={styles.textBox}>
                <h4>Rooted /متجذرون: Photography Panel and Exhibition</h4>
                <p>Acclaimed photographers Tanya Habjouqa and Wahaj Bani Muflih discussed how they use photography to tell the stories of Palestine and its people. The artists’ work was on exhibition from Sunday, March 27th - Sunday, April 2nd, 2022 at <a target="_blank" href="https://bard.alquds.edu/">Al-Quds Bard College</a>. Tanya Habjouqa joined from abroad via video call.</p>
                </div>     
            </div>
            <div className={styles.chapter + " " + styles.twoUp}>
                <div><img src={sakiye}/></div> 
                <div className={styles.textBox}>
                <h4>Sakiya Field Trip & Prickly Pear Workshop</h4>
                <p> Students visited the Sakiya nature reserve and academy with agronomist and community educator, Mary Diek. During their field visit, students learned how to make shelters out of prickly pear leaves, and in general, learned about local agrarian traditions of self-sufficiency and food production, toured the exhibition hall, and explored the intersections of art, science and permaculture.</p>
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
                <p> In May 2023, we held our 4th annual AQB Arts Showcase in Ramallah's Old City for an action-packed program of films, creative writing, multimedia, music and fine arts produced by our students, staff and faculty at AQB. We had over 80 people attend the arts crawl across three venues, and featured over 30 artists from AQB. This event has become a cherished AQB tradition that allows our community’s creativity to shine. </p>
                {/* <a className={"blue-button " + styles.button} target="_blank" href={'https://aqbarts.ps/?id=3'}>See More</a> */}
                </div>     
            </div>

            <div className={styles.resourceWrapper}>
                <div className={styles.chapter}>
                <h4>Resources</h4>
                <ul className={styles.twoColumn}>
                    <li><a href="https://buildpalestine.com/2021/05/15/trusted-organizations-to-donate-to-palestine/">Trusted Organizations to Donate to Palestine</a></li>
                    <li><a href="https://www.palestinefilminstitute.org/en/unprovoked-narratives"> Palestine Film Institute's <em>Unprovoked Narratives</em>: “A series of films celebrating the beauty of Gaza, its people, its struggle and its survival. The program aims to resist the demonisation of this beautiful place.” </a></li>
                    <li><a href="https://www.youtube.com/watch?v=HnZSaKYmP2s">Film: “Gaza Fights for Freedom (2019)”</a></li>
                    <li><a href="https://www.youtube.com/watch?v=TKZy5df_Juk">The War on Palestine Podcast</a></li>
                    <li><a href="https://fitzcarraldoeditions.com/books/minor-detail">Novel: Minor Detail by Adania Shibli</a></li>
                    <li><a href="https://www.tandfonline.com/journals/rpal20/collections/GazaTwoDecades">Journal of Palestinian Studies, <em>Gaza: Nearly Two Decades of Israeli Incursions, Siege, and Blockade</em></a></li>
                    <li><a href="https://twitter.com/m7mdkurd">Mohammed El-Kurd: Writer from occupied Jerusalem. Palestine Correspondent at The Nation. Culture Editor at Mondoweiss. </a></li>
                </ul>
                </div>
            </div>
        </Container>
      </Layout>
      
    </>
  );
};

export default AQBVoicesPage;
