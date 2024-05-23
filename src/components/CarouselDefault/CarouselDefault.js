import React, { useEffect, useRef, useState } from 'react'
import leftangle from '../../images/leftangle.svg'
import rightangle from '../../images/rightangle.svg'
import CarouselDefaultPlayer from '../Player/CarouselDefaultPlayer'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import "./CarouselDefault.scss";
import Shimmer from '../Shimmer';

const CarouselDefault = ({videos, type, responsive, heading}) => {
  const carouselRef= useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoIdRegex = /\/video\/(\d+)\?/;
  const items = videos.map((items) => <CarouselDefaultPlayer key={items?.video_url} url={items?.video_url} type={type} poster={items?.thumbnail} title={items?.video_title}/>)
  const screenWidth=window.innerWidth;
  const numberOfSlidesNormal= Math.ceil(screenWidth/375);
  const numberOfSlidesStory= Math.floor(screenWidth/241);
  function hideRightArrow(){
    if (type=="story"&&currentIndex>videos.length-numberOfSlidesStory) {
      return false
    }
    else if(type=="default"&&currentIndex>videos.length-numberOfSlidesNormal){
      return false
    }
    return true
  }

  // console.log(videos.length, "length");
  const slidePrev=()=>{
    if (carouselRef.current) {
      carouselRef.current.slidePrev();
    }
  }
  const slideNext=()=>{
    if (carouselRef.current) {
      carouselRef.current.slideNext();
    }
  }
  function handleSlideChange(index){
    setCurrentIndex(index.item);
  }
  function heightControl() {
    if (type=="story") {
      return "510px"
    }
    else{
      return true
    }
  }


  return (
    <div className='widget-wrap'>
      <p>{heading}</p>
      {currentIndex>=1&&(<div className='arrow-l' onClick={slidePrev}>
        <img src={leftangle} />
      </div>)}
      <div className={`${type=="story"?'carousel-wrapper-story':'carousel-wrapper'}`} >
      <AliceCarousel
        items={items}
        responsive={responsive}
        disableDotsControls={true}
        disableButtonsControls={true}
        mouseTracking={true}
        onSlideChanged={handleSlideChange}
        ref={carouselRef}
        autoHeight={heightControl()}
        autoWidth={true}
        touchTracking
        keyboardNavigation={false}
      />
      </div>
      {hideRightArrow()&&(<div className='arrow-r' onClick={slideNext}>
        <img src={rightangle}/>
      </div>)}
      {/* {console.log(currentIndex, "currentIndex")} */}
    </div>
  )
}

export default CarouselDefault