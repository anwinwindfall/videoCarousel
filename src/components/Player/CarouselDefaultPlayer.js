import React from 'react'
import ReactPlayer from 'react-player/vimeo'
import './CarouselDefaultPlayer.scss'
const CarouselDefaultPlayer = () => {
  return (
    
                <ReactPlayer  url='https://player.vimeo.com/video/924875252?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
                height="204px"
                width="375px"
                controls={true}
                style={{borderRadius:'4px !important'}}
                // className="Video-player-class"
                />
  )
}

export default CarouselDefaultPlayer