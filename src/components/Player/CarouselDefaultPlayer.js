import React from 'react'
import ReactPlayer from 'react-player/vimeo'
import './CarouselDefaultPlayer.scss'
const CarouselDefaultPlayer = () => {
  return (
                <ReactPlayer  url='https://player.vimeo.com/video/924875252?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
                height="204px"
                width="375px"
                controls={true}
                // style={{borderRadius:'4px !important'}}
                // className="Video-player-class"
                // className="Video-player-class"
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