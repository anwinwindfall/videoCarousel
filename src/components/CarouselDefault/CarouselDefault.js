import React, { useRef, useState } from 'react'
import leftangle from '../../images/leftangle.svg'
import rightangle from '../../images/rightangle.svg'
import CarouselDefaultPlayer from '../Player/CarouselDefaultPlayer'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import "./CarouselDefault.scss";

const CarouselDefault = ({videos, type, responsive, heading}) => {
  const carouselRef= useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = videos.map((items) => <CarouselDefaultPlayer url={items.video_url} type={type}/>)
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
    // console.log(currentIndex, "current index");
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
    <div>
      <p>{heading}</p>
      {currentIndex>=1&&(<div className='arrow-l' onClick={slidePrev}>
        <img src={leftangle} />
      </div>)}
      <div className={`${type=="story"?'carousel-wrapper-story':'carousel-wrapper'}`}>
      <AliceCarousel
        items={items}
        responsive={responsive}
        disableDotsControls={true}
        disableButtonsControls={true}
        mouseTracking
        onSlideChanged={handleSlideChange}
        ref={carouselRef}
        autoHeight={heightControl()}
        autoWidth={true}
        
      />
      </div>
      {currentIndex<videos.length-3&&(<div className='arrow-r' onClick={slideNext}>
        <img src={rightangle}/>
      </div>)}
      {/* {console.log(currentIndex, "currentIndex")} */}
    </div>
  )
}

export default CarouselDefault