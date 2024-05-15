import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player/vimeo'
import './CarouselDefaultPlayer.scss'
import Shimmer from '../Shimmer';


const CarouselDefaultPlayer = ({ type, url}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  function handlePlayerReady(){
    setIsLoaded(true)
  }
  return (
    <div className={`${type == "default" ? 'Video-player-class-wrap' : 'Video-player-class-story-wrap'}`}>
      {!isLoaded&&<Shimmer/>}
      <ReactPlayer
      url={url}
      controls={true}
      className={`${type == "default" ? 'Video-player-class' : 'Video-player-class-story'}`}
      onReady={handlePlayerReady}

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
            share: false
          }
        }
      }}
      />
        </div>

  )
  }
export default CarouselDefaultPlayer