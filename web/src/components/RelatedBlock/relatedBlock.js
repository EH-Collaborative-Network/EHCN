import React from "react";
// import MediaItem from "./MediaItem";
import { Link } from "@reach/router";
import * as styles from "./related.module.css";
import TranslatedTitle from "../TranslationHelpers/translatedTitle";
import TranslatedPhrase from "../TranslationHelpers/translatedPhrase";
import createDateTime from "../Time/createDateTime";
import translateTime from "../Time/translateTime";
import LangContext from "../context/lang";
import BlockContent from "../TranslationHelpers/block-content";
import ArchiveItem from "../ArchiveItem/archiveItem"
import {Figure} from "../Figure/figure"
// import { FundingOpportunity } from "./fundingOpportunity"
const RelatedBlock = ({node, languagePhrases, globalLanguages, opps}) => {
if(node){
    let locale = 'en-GB';
    let offset = null;
      
  return(
    <div aria-hidden="true" className={styles.root}>
        <div className="one-column">
        {(node.partners?.length > 0) &&
            <section>
            <h4><TranslatedPhrase phrase={"relatedPartners"} translations={languagePhrases}/></h4>
            <ul className={styles.special}>
               {
                   node.partners.map(function(node,index){
                       return(
                           <li key={index}><Link to={"/partner/"+node.slug?.current}>{node.name}</Link></li>
                       )
                   })
                }            
            </ul>
            </section>
        }
        {(node.learningResources?.length > 0) &&
            <section>
            <h4><TranslatedPhrase phrase={"relatedLearningResources"} translations={languagePhrases}/></h4>
            <ul>
               {
                   node.learningResources.map(function(node,index){
                       return(
                           <li key={index}><Link to={"/learning-resource/"+node.slug?.current}><TranslatedTitle translations={node.titles}/></Link></li>
                       )
                   })
                }            
            </ul>
            </section>
        }

        
        {(node.courses?.length > 0) &&
            <section>
            <h4><TranslatedPhrase phrase={"relatedCourses"} translations={languagePhrases}/></h4>
            <ul>
               {
                   node.courses.map(function(node,index){
                       return(
                           <li key={index}><Link to={"/course/"+node.slug?.current}><TranslatedTitle translations={node.titles}/></Link></li>
                       )
                   })
                }            
            </ul>
            </section>
        }
        {(node.workingGroups?.length > 0) &&
            <section>
            <h4><TranslatedPhrase phrase={"relatedWorkingGroups"} translations={languagePhrases}/></h4>
            <ul>
               {
                   node.workingGroups.map(function(node,index){
                       return(
                           <li key={index}><Link to={"/working-group/"+node.slug?.current}><TranslatedTitle translations={node.titles}/></Link></li>
                       )
                   })
                }            
            </ul>
            </section>
        }
        {(node.projects?.length > 0) &&
            <section>
            <h4><TranslatedPhrase phrase={"relatedProjects"} translations={languagePhrases}/></h4>

               {
                   node.projects.map(function(node,index){
                       return(

                            <Link key={index} className={styles.relatedCard} to={"/project/"+node.slug?.current}>
                                {node.mainImage &&
                                    <Figure normal={true} node={node.mainImage} />  
                                }
                                <div className={styles.textBox}>
                                <h4><TranslatedTitle translations={node.titles}/></h4>
                                <p><BlockContent languagePhrases={languagePhrases} globalLanguages={globalLanguages} blocks={node.descriptions}/></p>
                                <Link key={index} className={"blue-button"} to={"/project/"+node.slug?.current}>See More</Link>
                                </div>
                            </Link>  
            
                       )
                   })
                }            

            </section>
        }
                {(node.events?.length > 0) &&
            <LangContext.Consumer>
            {theme => {
               let lang = theme.lang
               let sortedEvents = node.events.sort((a,b) => createDateTime(b.startDate?.date, b.startDate?.time, b.timeZone?.offset).getDate() - createDateTime(a.startDate?.date, a.startDate?.time, a.timeZone?.offset).getDate()); 
        
               if(languagePhrases){
                if(lang){
                  languagePhrases.forEach(element => {
                    element = element.node
                    if(element.code == lang){
                      
        
                        locale = element.locale
              
                      
                    }
                  });
                } else {
                  languagePhrases.forEach(element => {
                    element = element.node
                    if(element.name == "English"){
                      locale = element.locale
                    }
                  });
                }
                
        
              }
                return(
            <section>
            <h4><TranslatedPhrase phrase={"relatedEvents"} translations={languagePhrases}/></h4>
                    <div className={styles.wrapper}>
               {
                   sortedEvents.map(function(node,index){
                    let start = node.startDate
                    let end = node.endDate || node.startDate;
                    
                    let sd = createDateTime(start.date, start.time, node.timeZone.offset);
                    let ed = createDateTime(end.date, end.time, node.timeZone.offset);
                    let multi = false;
                    let today = new Date();
                    let upcoming = false;
                    let current = false;
                    if((sd.getDate() == today.getDate() || sd.getDate() > today.getDate()) && sd.getFullYear() == today.getFullYear() && sd.getMonth() == today.getMonth()){
                        upcoming = true;
                    }
                    if(((sd.getDate() == today.getDate() || sd.getDate() < today.getDate()) && (ed.getDate() > today.getDate())) && sd.getFullYear() == today.getFullYear() && sd.getMonth() == today.getMonth()){
                        current = true;
                    }
                    if(sd.getDate() != ed.getDate()){
                        multi = true
                    }

                       return(
                            <ArchiveItem titles={node.titles} key={index} image={node.mainImage} link={"/event/"+node.slug?.current}/>
                       )
                   })
                }            
            </div>
            </section>
                )}}
            </LangContext.Consumer>
        }
        
         
 
        </div>
       
    </div>
  )
}
};

export default RelatedBlock;
