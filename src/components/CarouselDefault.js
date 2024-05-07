import React from 'react'
import leftangle from '../images/leftangle.svg'
import rightangle from '../images/rightangle.svg'
import CarouselDefaultPlayer from './CarouselDefaultPlayer'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.scss';

const CarouselDefault = () => {
  const items=[1,1,1,1,1,1].map((items)=><CarouselDefaultPlayer/>)
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