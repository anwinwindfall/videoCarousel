import React from 'react';
import './App.scss';
import CarouselDefault from './components/CarouselDefault';

function App({ moduleData }) {
  // eslint-disable-next-line no-console
  // console.log(
  //   'all of your data typically accessed via the "module" keyword in HubL is available as JSON here!',
  //   moduleData,
  // );
  return (
    <CarouselDefault/>
  );
}

export default App;
