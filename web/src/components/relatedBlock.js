import React from "react";
import BlockContent from "./block-content";
// import MediaItem from "./MediaItem";
import { Link } from "@reach/router";
import * as styles from "./css/related.module.css";
import TranslatedTitle from "./translatedTitle";
import TranslatedPhrase from "./translatedPhrase";
// import { FundingOpportunity } from "./fundingOpportunity"
const RelatedBlock = ({node, languagePhrases, opps}) => {
if(node){
     

  return(
    <div aria-hidden="true" className={styles.root}>
        <div className="two-column">
        {(node.researchThreads?.length > 0) &&
            <>
            <h4><TranslatedPhrase phrase={"relatedResearchThreads"} translations={languagePhrases}/></h4>
            <ul className={styles.special}>
               {
                   node.researchThreads.map(function(node,index){
                       return(
                           <li className="blue-button" key={index}><Link to={"/research-thread/"+node.slug?.current}><TranslatedTitle translations={node.titles}/>→</Link></li>
                       )
                   })
                }            
            </ul>
            </>
        }
        {(node.partners?.length > 0) &&
            <>
            <h4><TranslatedPhrase phrase={"relatedPartners"} translations={languagePhrases}/></h4>
            <ul className={styles.special}>
               {
                   node.partners.map(function(node,index){
                       return(
                           <li className="blue-button" key={index}><Link to={"/partner/"+node.slug?.current}>{node.name}→</Link></li>
                       )
                   })
                }            
            </ul>
            </>
        }
        {(node.events?.length > 0) &&
            <>
            <h4><TranslatedPhrase phrase={"relatedEvents"} translations={languagePhrases}/></h4>
            <ul>
               {
                   node.events.map(function(node,index){
                       return(
                           <li className="blue-button" key={index}><Link to={"/event/"+node.slug?.current}><TranslatedTitle translations={node.titles}/>→</Link></li>
                       )
                   })
                }            
            </ul>
            </>
        }
        {(node.newsItems?.length > 0) &&
            <>
            <h4><TranslatedPhrase phrase={"relatedNews"} translations={languagePhrases}/></h4>
            <ul>
               {
                   node.newsItems.map(function(node,index){
                       return(
                           <li className="blue-button" key={index}><Link to={"/news/"+node.slug?.current}><TranslatedTitle translations={node.titles}/>→</Link></li>
                       )
                   })
                }            
            </ul>
            </>
        }
        
        {(node.courses?.length > 0) &&
            <>
            <h4><TranslatedPhrase phrase={"relatedCourses"} translations={languagePhrases}/></h4>
            <ul>
               {
                   node.courses.map(function(node,index){
                       return(
                           <li className="blue-button" key={index}><Link to={"/course/"+node.slug?.current}><TranslatedTitle translations={node.titles}/>→</Link></li>
                       )
                   })
                }            
            </ul>
            </>
        }
        {(node.workingGroups?.length > 0) &&
            <>
            <h4><TranslatedPhrase phrase={"relatedWorkingGroups"} translations={languagePhrases}/></h4>
            <ul>
               {
                   node.workingGroups.map(function(node,index){
                       return(
                           <li className="blue-button" key={index}><Link to={"/working-group/"+node.slug?.current}><TranslatedTitle translations={node.titles}/>→</Link></li>
                       )
                   })
                }            
            </ul>
            </>
        }
        {(node.projects?.length > 0) &&
            <>
            <h4><TranslatedPhrase phrase={"relatedProjects"} translations={languagePhrases}/></h4>
            <ul>
               {
                   node.projects.map(function(node,index){
                       return(
                           <li className="blue-button" key={index}><Link to={"/project/"+node.slug?.current}><TranslatedTitle translations={node.titles}/>→</Link></li>
                       )
                   })
                }            
            </ul>
            </>
        }
        
         {(node.learningResources?.length > 0) &&
            <>
            <h4><TranslatedPhrase phrase={"relatedLearningResources"} translations={languagePhrases}/></h4>
            <ul>
               {
                   node.learningResources.map(function(node,index){
                       return(
                           <li className="blue-button" key={index}><Link to={"/learning-resource/"+node.slug?.current}><TranslatedTitle translations={node.titles}/>→</Link></li>
                       )
                   })
                }            
            </ul>
            </>
        }
         {(opps?.length > 0) &&
            <>
            <h4><TranslatedPhrase phrase={"fundingOpportunities"} translations={languagePhrases}/></h4>
            <ul>
            {
                opps.map(function(node,index){
                    return(
                        <li className="blue-button" key={index}><Link to={"/funding/"}><TranslatedTitle translations={node.node.titles}/>→</Link></li>
                    )
                })
            }            
            </ul>
            </>
        }
        </div>
       
    </div>
  )
}
};

export default RelatedBlock;
