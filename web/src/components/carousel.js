import React from "react";
import AliceCarousel from "react-alice-carousel";
import * as styles from "./css/carousel.module.css";
import MediaItem from "./MediaItem";
import 'react-alice-carousel/lib/alice-carousel.css';

const Carousel = ({ media }) => {
  let medias = media.map(function(node, index){
    return <MediaItem key={index} media={node}></MediaItem>;
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
