import React from 'react'
import ReactPlayer from 'react-player/vimeo'

const CarouselDefaultPlayer = () => {
  return (
                <ReactPlayer  url='https://player.vimeo.com/video/892994972?badge=0&amp'
                height="200px"
                width="300px"
                controls={true}
                />
  )
}

export default CarouselDefaultPlayer