import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player/vimeo'
import './CarouselDefaultPlayer.scss'
import Shimmer from '../Shimmer';


const CarouselDefaultPlayer = ({ type, url, poster, title}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    const handleFullScreenChange = () => {
      const video = videoRef.current;
      if (!document.fullscreenElement) {
        video.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    document.addEventListener('mozfullscreenchange', handleFullScreenChange);
    document.addEventListener('msfullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullScreenChange);
      document.removeEventListener('msfullscreenchange', handleFullScreenChange);
    };
  }, []);
  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
      handleFullScreen();
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleVolumeChange = (event) => {
    const video = videoRef.current;
    video.volume = event.target.value;
    setVolume(event.target.value);
  };

  const handleSeekChange = (event) => {
    const video = videoRef.current;
    const seekTo = (event.target.value / 100) * duration;
    video.currentTime = seekTo;
    setCurrentTime(seekTo);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    setCurrentTime(video.currentTime);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    setDuration(Math.ceil(video.duration/60));
  };

  const handleFullScreen = () => {
    const video = videoRef.current;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  };
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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
    <video ref={videoRef}
    onLoadedData={handlePlayerReady}
    onLoadedMetadata={handleLoadedMetadata}
    width={handleWidth(type)}
    height={handlHeight(type)}
    poster={poster?.src}
    disablepictureinpicture controlslist="nodownload noplaybackrate"
    className={`${type == "default" ? 'Video-player-class' : 'Video-player-class-story'}`}>
  <source src={url}/>
  </video>
  <div className='controls'>
  {isLoaded&&<button onClick={handlePlayPause} className='btn-play'>
          {isPlaying ? <img src='https://upload.wikimedia.org/wikipedia/commons/d/dc/Pause_Button_icon_Apple.svg'/> : <img src='https://143223961.fs1.hubspotusercontent-eu1.net/hubfs/143223961/raw_assets/public/Assets/Eucharistic%20Revival/play.svg'/>}
        </button>}
  </div>
  {isLoaded&&type=='default'&&<div className='title'>
     <p>{`${duration} mins watch`}</p>
      <h1>{title&&title}</h1>
  </div>}
      
        </div>

  )
  }
export default CarouselDefaultPlayer








