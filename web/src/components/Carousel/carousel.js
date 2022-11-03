import React, {useState,useEffect}  from "react";
// import AliceCarousel from "react-alice-carousel";
import * as styles from "./carousel.module.css";
import MediaItem from "../MediaItem/mediaItem";
import 'react-alice-carousel/lib/alice-carousel.css';
import { Figure } from "../Figure/figure";
import TranslatedTitle from "../TranslationHelpers/translatedTitle";
import { Link } from "@reach/router";
import Masonry from "../Masonry/Masonry";

const Carousel = ({ media, imageOnly }) => {
  const [start, setStart] = useState([0,0]);
  const [a, setA] = useState("");
  const [el, setEl] = useState("")
  const [dir, setDir] = useState(0)
  const [paused, setPaused] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  
  useEffect(() => {
setTimeout(function(){
  let tracks = document.getElementsByClassName(styles.slideTrack);
    for(let j = 0; j < tracks.length; j++){
     let track = tracks[j];
     let as = track.querySelectorAll('a');
     if(!as){
      let as =  track.querySelectorAll('figure');
     }
     let totalWidth = 0;
    
    
     for(let i = 0; i < as.length; i++){
        
       totalWidth = totalWidth + as[i].offsetWidth + 5;
     }
     if(totalWidth > 50){
      track.style.maxWidth = Math.round(totalWidth) + "px"
     }
      
    }
},500)
  
  

    let interval = setInterval(() => {
     
      let tracks = document.getElementsByClassName(styles.slideTrack);
      for(let j = 0; j < tracks.length; j++){
        let track = tracks[j];
        let inner = track.closest('.inner');
        
        let t = track.style.transform;
        t = t.split("%")[0];
        t = t.split("(-")[1];
        t = parseFloat(t)
        let valToScroll = 0;

    
        if(track.classList.contains('paused')){
          // inner.scrollLeft += 0;
         
        }else if(track.classList.contains('rtl') && inner.scrollLeft >= (inner.scrollWidth - inner.offsetWidth - 1) && (inner.scrollWidth - inner.offsetWidth - 1) > 0){
          // inner.scrollLeft -= 1;
          valToScroll -= 3;
          setDir(dir => 1);
        }else if(track.classList.contains('ltr') && inner.scrollLeft <= 0){
          // inner.scrollLeft += 1;
          valToScroll += 3
          setDir(dir => 0);
        }else if(track.classList.contains('ltr')){
          // inner.scrollLeft -= 1;
          valToScroll -= 3
        }else{
          // inner.scrollLeft += 1;
          valToScroll += 3;

        }
        inner.scrollBy({left: valToScroll, behavior: "smooth"})
      } 
    }, 50);

    return () => clearInterval(interval);

  }, []);
  const handleOver = function(event){
    setPaused(true)
  }
  const handleOut = function(event){
    setPaused(false)
  }
  const handleDown = function(event){
    event.preventDefault()
    let track = document.getElementsByClassName(styles.slideTrack)[0];
    let inner = track.closest('.inner');
    let el = event.target;
    if(!el.href){
      el = el.closest("a")?.href
      if(!el && !imageOnly){
        setEl(event.target.closest(".slide-track > div"))
      }
    }else{
      el = el.href
    }
    setA(el)
    setStartX(event.pageX - inner.offsetLeft);
    setIsDragging(true);
    setScrollLeft(inner.scrollLeft)
    setStart([event.pageX, event.pageY])
  }
  
  const handleMove = function(e){
    let track = e.target;
    if(!track.classList.contains("slide-track")){
      if(track.closest("slide-track")){
        track = track.closest("slide-track")
      }
    }
    let inner = track.closest('.inner');
    let x = e.pageX - inner.offsetLeft;
    let walk = (x - startX) * 3; //scroll-fast
    if(isDragging){
      inner.scrollLeft = scrollLeft - walk;
    }
  }
  function lightboxed(e){
    let media = e.cloneNode(true);
    if(!media){
       media = e.closest(".masonry-inner > div")?.cloneNode(true);
    }
    if(!media){
      media = e.closest(".wrapper")?.cloneNode(true);
    }
    document.querySelector("#light-box .inner").innerHTML = ""
    document.querySelector("#light-box .inner").append(media)
    document.getElementById("light-box").classList.add("show");
  } 
  const handleUp = function(e){
    let startX = start[0]
    let startY = start[1]
    const diffX = Math.abs(e.pageX - startX);
    const diffY = Math.abs(e.pageY - startY);
    setIsDragging(false)
    if(diffX > 20){
      e.preventDefault()
    }else{
      if(a){
        window.location.href = a
      }else if(el){
        lightboxed(el)
      }
      
    }
  }


  let medias = media.map(function(node, index){
    if(imageOnly){
      if(node[0]){
      return(
        <Link key={index} onMouseDown={handleDown} onMouseUp={handleUp} to={node[2]}>
            <Figure key={index} node={node[0]} />
            <h4><TranslatedTitle translations={node[1]}/></h4>
        </Link>
      )
      }else{
       return null
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
    <>
    {(media.length <= 2 && !imageOnly) ?
      <Masonry media={media}/>
              :
    <div className={styles.root}>
        <div className={styles.inner + " inner"}>
      
        <div onMouseDown={imageOnly ? null: handleDown} onMouseUp={imageOnly ? null :  handleUp} onMouseMove={handleMove} onMouseOver={handleOver} onMouseLeave={handleOut} className={`${dir ? 'ltr' : 'rtl'}` +" " + styles.slideTrack + " "+"slide-track " + `${paused ? 'paused' : ''}`}>
          {medias}
        </div>
            {/* <AliceCarousel autoPlayStrategy={"default"} autoPlayInterval={0} animationEasingFunction={"linear"} animationDuration={10000} autoPlay infinite keyboardNavigation responsive={resp} disableButtonsControls disableDotsControls mouseTracking items={medias}/> */}
        </div>
      <div className={styles.wrapper}></div>
    </div>
    }
    </>
  ) 
};

export default Carousel;
