import React from 'react';
import './App.scss';
import CarouselDefault from './components/CarouselDefault/CarouselDefault';

function App({ moduleData }) {
  // eslint-disable-next-line no-console
  // console.log(
  //   'all of your data typically accessed via the "module" keyword in HubL is available as JSON here!',
  //   moduleData,
  // );
  let dimensions={
    width: '',
    height: ''
  }
  const responsive = {
    0: { items: 1 },
    420: { items: 1 },
    576: { items: 1.4 },
    768: { items: 1.4 },
    848: { items: 2.1 },  
    925: { items: 2.1 },
    1200: { items: 3 },
    1700: { items: 3.8 },
    2000: { items: 4 },
  };
  // const responsive = {
  //   0: { items: 1 }, // show 1 item on smaller screens
  //   600: { items: 2 }, // show 2 items on medium screens
  //   1024: { items: 3 } // show 3 items on larger screens
  // };
  console.log(moduleData.video_type);
  return (

    <CarouselDefault type={moduleData.video_type} videos={moduleData.video_settings} responsive={responsive} heading={moduleData.carousel_heading}/>
  );
}

export default App;
