import React, {useState} from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import Container from "../components/Container/container";
import BlockContent from "../components/TranslationHelpers/block-content";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import LangContext from "../components/context/lang";
import Layout from "../containers/layout";
import TranslatedPhrase from "../components/TranslationHelpers/translatedPhrase";
import TimeZoneList from "../components/Time/timeZoneList";
import DisplayTime from "../components/Time/displayTime";
import CreateCalendar from "../components/Time/createCalendar"
import CreateWeek from "../components/Time/createWeek"
import * as styles from "../components/Time/time.module.css"

export const query = graphql`
  query CalendarPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
      showMarquee
      marqueeText{
        _rawText(resolveReferences: { maxDepth: 20 })
        language{
          id
          code
          name
        }
      }
      languages {
        name
        code
        locale
      }
    }
    languagePhrases: allSanityLanguage {
      edges {
        node {
          name
          code
          aboutEHCN
          calendar
          fundingOpportunities
          ehcnSupported
          learningResources
          researchThreads
          availableIn
          search
          timezone
          sunday
          monday
          tuesday
          wednesday
          thursday
          friday
          saturday
          january
          february
          march
          april
          may
          june
          july
          august
          september
          october
          november
          december

        }
      }
    }
    events: allSanityEvent(
      limit: 1000
      filter: { slug: { current: { ne: null } }}
    ) {
      edges {
        node {
          id
          slug{
            current
          }
          titles{
            text
            language{
              id
              name
              code
            }
          }
          locations{
            _rawText(resolveReferences: { maxDepth: 20 })
            language{
              id
              name
              code
            }
          }
          timeZone{
            name
            offset
          }
          startDate{
            date
            time
          }
          endDate{
            date
            time
          }
        }
      }
    }
  }
`;

const CalendarPage = props => {
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
  const events = (data || {}).events?.edges;
  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }
  function getSunday() {
    // Copy date so don't modify original
    let d = new Date();
    let day = d.getDay();
    day = day;
    return( new Date(new Date().setDate(new Date().getDate()-day)))
  }

  const [offset, setOffset] = useState(null);
  const [monthView, setMonthView] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth());
  const [sunday, setSunday] = useState(getSunday());
  const [year, setYear] = useState(new Date().getFullYear())
  function showMonth(){
    setMonthView(true);
  }
  function showWeek(){
    setMonthView(false);
  }
  function handleTime(e){
    let value = e.target.value;
    if(value){
      let value = parseInt(value);
    }
    setOffset(value);
  }
  function decrement(){
    let n;

    if(month == 0){
      n = 11;
      setYear(year - 1);
    }else{
      n = month - 1;
    }
    setMonth(n)
  }
  function increment(){
    let n;
    if(month == 11){
      n = 0;
      setYear(year + 1);
    }else{
      n = month + 1;
    }
    setMonth(n)
  }

  function decrementWeek(){
    let n;
    let w = new Date(sunday.valueOf());
    n = new Date(w.setDate(w.getDate() - 7))
    setSunday(n)
  }
  function incrementWeek(){
    let n;
    let w = new Date(sunday.valueOf());
    n =new Date( w.setDate(w.getDate() + 7))
    setSunday(n)
  }
  
    return (
      <>  
      <Layout extra="" navTranslations={languagePhrases} globalLanguages={globalLanguages} showMarquee={site.showMarquee} marqueeContent={site.marqueeText}>
        <SEO title={site.title} description={site.description} keywords={site.keywords} />
        
        <Container>
          <h1 hidden>Welcome to {site.title}</h1>
          <h1><TranslatedPhrase translations={languagePhrases} phrase={"calendar"}/></h1>
          <button className={styles.bubbleButton} disabled={monthView ? true : false} onClick={showMonth} aria-labelled-by="switch-to-month">
            <span id='switch-to-month' hidden>switch to month view</span>
            <svg  viewBox="0 0 37 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="7.59763" height="6.4" rx="3.2" transform="matrix(1 0 0 -1 0 6.40039)" fill="#D4EAED"/>
            <rect width="7.59763" height="6.4" rx="3.2" transform="matrix(1 0 0 -1 9.49609 6.40039)" fill="#D4EAED"/>
            <rect width="7.59763" height="6.4" rx="3.2" transform="matrix(1 0 0 -1 18.9941 6.40039)" fill="#D4EAED"/>
            <rect width="7.59763" height="6.4" rx="3.2" transform="matrix(1 0 0 -1 28.4922 6.40039)" fill="#D4EAED"/>
            <rect width="7.59763" height="6.4" rx="3.2" transform="matrix(1 0 0 -1 0 14.9336)" fill="#D4EAED"/>
            <rect width="7.59763" height="6.4" rx="3.2" transform="matrix(1 0 0 -1 9.49609 14.9336)" fill="#D4EAED"/>
            <rect width="7.59763" height="6.4" rx="3.2" transform="matrix(1 0 0 -1 18.9941 14.9336)" fill="#D4EAED"/>
            <rect width="7.59763" height="6.4" rx="3.2" transform="matrix(1 0 0 -1 28.4922 14.9336)" fill="#D4EAED"/>
            <rect width="7.59763" height="6.4" rx="3.2" transform="matrix(1 0 0 -1 0 23.4668)" fill="#D4EAED"/>
            <rect width="7.59763" height="6.4" rx="3.2" transform="matrix(1 0 0 -1 9.49609 23.4668)" fill="#D4EAED"/>
            <rect width="7.59763" height="6.4" rx="3.2" transform="matrix(1 0 0 -1 18.9941 23.4668)" fill="#D4EAED"/>
            <rect width="7.59763" height="6.4" rx="3.2" transform="matrix(1 0 0 -1 28.4922 23.4668)" fill="#D4EAED"/>
            <rect width="7.59763" height="6.4" rx="3.2" transform="matrix(1 0 0 -1 0 32)" fill="#D4EAED"/>
            <rect width="7.59763" height="6.4" rx="3.2" transform="matrix(1 0 0 -1 9.49609 32)" fill="#D4EAED"/>
            <rect width="7.59763" height="6.4" rx="3.2" transform="matrix(1 0 0 -1 18.9941 32)" fill="#D4EAED"/>
            <rect width="7.59763" height="6.4" rx="3.2" transform="matrix(1 0 0 -1 28.4922 32)" fill="#D4EAED"/>
            </svg>
          </button>
          <button className={styles.bubbleButton} disabled={monthView ? false : true} onClick={showWeek} aria-labelled-by="switch-to-week">
            <span id='switch-to-week' hidden>switch to week view</span>
            <svg  viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="39.8876" height="6.4" rx="3.2" transform="matrix(1 0 0 -1 0 6.40039)" fill="#D4EAED"/>
            <rect width="39.8876" height="6.4" rx="3.2" transform="matrix(1 0 0 -1 0 14.9336)" fill="#D4EAED"/>
            <rect width="39.8876" height="6.4" rx="3.2" transform="matrix(1 0 0 -1 0 23.4668)" fill="#D4EAED"/>
            <rect width="39.8876" height="6.4" rx="3.2" transform="matrix(1 0 0 -1 0 32)" fill="#D4EAED"/>
            </svg>
          </button>
          <div>
            <div className={styles.selectWrapper}>
              <label className={styles.label} for="change-tz">{<TranslatedPhrase translations={languagePhrases} phrase={'timezone'}/>}:</label>
              <select className={styles.select} id="change-tz" onChange={handleTime}>
                <TimeZoneList />
              </select>
            </div>
            {monthView &&
            <>
            <div className={styles.buttonWrapper}>
            <button onClick={decrement} aria-labelled-by="previous-month">
              <span id='previous-month' hidden>previous month</span>
              <svg width="63" height="16" viewBox="0 0 63 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.292892 7.29289C-0.0976295 7.68342 -0.0976295 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41422 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM63 7L1 7V9L63 9V7Z" fill="#333333"/>
              </svg>
            </button>
            <button onClick={increment} aria-labelled-by="next-month">
              <span id='next-month' hidden>next month</span>
              <svg width="61" height="16" viewBox="0 0 61 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M60.7071 8.70711C61.0976 8.31658 61.0976 7.68342 60.7071 7.29289L54.3432 0.928932C53.9526 0.538408 53.3195 0.538408 52.9289 0.928932C52.5384 1.31946 52.5384 1.95262 52.9289 2.34315L58.5858 8L52.9289 13.6569C52.5384 14.0474 52.5384 14.6805 52.9289 15.0711C53.3195 15.4616 53.9526 15.4616 54.3432 15.0711L60.7071 8.70711ZM0 9L60 9V7L0 7L0 9Z" fill="#333333"/>
              </svg>
            </button>
            </div>

            
            <LangContext.Consumer>
            {theme => {
                    return(
                      <CreateCalendar globalLanguages={globalLanguages} events={events} theme={theme} translations={languagePhrases} year={year} offset={offset} month={month} />
                    )}}
            </LangContext.Consumer>
            </>
            }
            {!monthView &&
            <>
            <div className={styles.buttonWrapper}>
            <button onClick={decrementWeek} aria-labelled-by="previous-week">
              <span id='previous-week' hidden>previous week</span>
              <svg width="63" height="16" viewBox="0 0 63 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.292892 7.29289C-0.0976295 7.68342 -0.0976295 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41422 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM63 7L1 7V9L63 9V7Z" fill="#333333"/>
              </svg>
            </button>
            <button onClick={incrementWeek} aria-labelled-by="next-week">
              <span id='next-week' hidden>next week</span>
              <svg width="61" height="16" viewBox="0 0 61 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M60.7071 8.70711C61.0976 8.31658 61.0976 7.68342 60.7071 7.29289L54.3432 0.928932C53.9526 0.538408 53.3195 0.538408 52.9289 0.928932C52.5384 1.31946 52.5384 1.95262 52.9289 2.34315L58.5858 8L52.9289 13.6569C52.5384 14.0474 52.5384 14.6805 52.9289 15.0711C53.3195 15.4616 53.9526 15.4616 54.3432 15.0711L60.7071 8.70711ZM0 9L60 9V7L0 7L0 9Z" fill="#333333"/>
              </svg>
            </button>
            </div>
                      
            <LangContext.Consumer>
            {theme => {
                  console.log(sunday)
                    return(
                      <CreateWeek globalLanguages={globalLanguages} events={events} theme={theme} translations={languagePhrases} year={year} offset={offset} week={sunday} />
                    )}}
            </LangContext.Consumer>
            </>}
            
          </div>
        </Container>
      </Layout>
      
    </>
  );
};

export default CalendarPage;
