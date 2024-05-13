import React from 'react'
import ReactPlayer from 'react-player/vimeo'
import './CarouselDefaultPlayer.scss'
const CarouselDefaultPlayer = ({type,url}) => {
  return (
                <ReactPlayer  url={url}
                controls={true}
                className={`${type=="default"?'Video-player-class':'Video-player-class-story'}`}
                config={{
                  vimeo: {
                    playerOptions: {
                      chromecast:false,
                      pip:false,
                      transcript:false,
                      play_button_position: 'center',
                      interactive_markers: false,
                      progress_bar:false,
                      quality_selector:false,
                      quality:'720p',
                      share: false
                    }
                  }
                }}
                />
  )
}

export default CarouselDefaultPlayer