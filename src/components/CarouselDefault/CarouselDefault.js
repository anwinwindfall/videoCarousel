import React from 'react'
import leftangle from '../../images/leftangle.svg'
import rightangle from '../../images/rightangle.svg'
import CarouselDefaultPlayer from '../Player/CarouselDefaultPlayer'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import "./CarouselDefault.scss";

const CarouselDefault = () => {
  const items = [1, 1, 1, 1, 1, 1].map((items) => <CarouselDefaultPlayer />)
  const responsive = {
    0: { items: 1 },
    420: { items: 1.1 },
    576: { items: 1.4 },
    768: { items: 2.1 },
    925: { items: 3.1 },
    1528: { items: 4.1 },
  };
  return (
    <div>
      <p>true stories - 6 videos</p>
      <div className='arrow-l'>
        <img src={leftangle} />
      </div>
      <AliceCarousel
        items={items}
        responsive={responsive}
        disableDotsControls={true}
        disableButtonsControls={true}
        infinite
      />
      <div className='arrow-r'>
        <img src={rightangle} />
      </div>
      
    </div>
  )
}

export default CarouselDefault