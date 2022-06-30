import React from "react";
import AliceCarousel from "react-alice-carousel";
import * as styles from "./carousel.module.css";
import MediaItem from "../MediaItem/mediaItem";
import 'react-alice-carousel/lib/alice-carousel.css';
import { Figure } from "../Figure/figure";
import TranslatedTitle from "../TranslationHelpers/translatedTitle";
import { Link } from "@reach/router";

const Carousel = ({ media, imageOnly }) => {
  let medias = media.map(function(node, index){
    if(imageOnly){
      if(node[0]){
      return(
        <Link to={node[2]}>
            <Figure key={index} node={node[0]} />
        <h4><TranslatedTitle translations={node[1]}/></h4>
        </Link>
      )
      }else{
        return(<></>)
      }
    }else{
      return <MediaItem key={index} media={node}></MediaItem>;
    }
    
})

let resp = {
    0: {
        items: 1,
    },
    1024: {
        items: 3
    }
  }
  return(
    <div className={styles.root}>
            <div className={styles.inner}>
                <AliceCarousel autoPlayStrategy={"default"} autoPlayInterval={0} animationEasingFunction={"linear"} animationDuration={10000} autoPlay infinite keyboardNavigation responsive={resp} disableButtonsControls disableDotsControls mouseTracking items={medias}/>
            </div>
            <div className={styles.wrapper}></div>
    </div>
  ) 
};

export default Carousel;
