import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player/vimeo'
import './CarouselDefaultPlayer.scss'
import Shimmer from '../Shimmer';
import VimeoPlayer from 'react-player/vimeo';


const CarouselDefaultPlayer = ({ type, url}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  function handlePlayerReady(){
    setIsLoaded(true)
  }
  function handleWidth(type){
    if (type=='default') {
      return '375px'
    }
    else{
      return '241px'
    }
  }
  function handlHeight(type){
    if (type=='default') {
      return '205px'
    }
    else{
      return '410px'
    }
  }
  return (
    <div className={`${type == "default" ? 'Video-player-class-wrap' : 'Video-player-class-story-wrap'}`}>
      {!isLoaded&&<Shimmer type={type}/>}
      <ReactPlayer
      url={url}
      controls={true}
      className={`${type == "default" ? 'Video-player-class' : 'Video-player-class-story'}`}
      onReady={handlePlayerReady}
      width={handleWidth(type)}
      height={handlHeight(type)}
      config={{
        vimeo: {
          playerOptions: {
            chromecast: false,
            pip: false,
            transcript: false,
            play_button_position: 'center',
            interactive_markers: false,
            progress_bar: false,
            quality_selector: false,
            quality: '720p',
            share: false,
          }
        }
      }}
      />
        </div>

  )
  }
export default CarouselDefaultPlayer