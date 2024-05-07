import React from 'react'
import leftangle from '../images/leftangle.svg'
import rightangle from '../images/rightangle.svg'
import CarouselDefaultPlayer from './CarouselDefaultPlayer'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/scss/alice-carousel.scss";

const CarouselDefault = () => {
  const items=[1,1,1,1,1].map((items)=><CarouselDefaultPlayer/>)
  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5 },
};
  return (
    <div>
        <AliceCarousel
        items={items}
        responsive={responsive}
        disableDotsControls={true}
        disableButtonsControls={true}
        infinite
        />
    </div>
  )
}

export default CarouselDefault