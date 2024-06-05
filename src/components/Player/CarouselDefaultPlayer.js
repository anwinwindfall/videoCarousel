import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player/vimeo'
import './CarouselDefaultPlayer.scss'
import Shimmer from '../Shimmer';


const CarouselDefaultPlayer = ({ type, url, poster, title }) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [videoBlobUrl, setVideoBlobUrl] = useState()
  const [loading, setLoading] = useState(false)
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [metaDataLoaded, setMetaDataLoaded] = useState(false);
  const [duration, setDuration] = useState(0);
  const regex = /\/(\d+)\.m3u8/;
  const match = url.match(regex);
  const videoId = match[1]

  const fetchVimeoM3U8Url = async (videoId) => {
    const response = await fetch(`https://api.vimeo.com/videos/${videoId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_VIMEO_TOKEN}`
      }
    });
    const data = await response.json();
    // Assuming the .m3u8 URL is under 'files' in the API response
    const m3u8File = data.files.find(file => file.rendition === '1080p');
    return m3u8File ? m3u8File.link : null;
  };
  const fetchVideoUrl = async () => {
    setLoading(true);
    try {
      const url = await fetchVimeoM3U8Url(videoId);
      const response = await fetch(url);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      setVideoBlobUrl(objectUrl);
    } catch (error) {
      console.error('Error fetching video URL:', error);
    }
    setLoading(false);
  };

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

  const handlePlay = async () => {
    const video = videoRef.current;
    if (!document.fullscreenElement) {
      handleFullScreen();
    }
    if (videoRef.current) {
      const videos = document.querySelectorAll('video');
      videos.forEach(video => {
        if (video !== videoRef.current && !video.paused) {
          video.pause();
        }
      });
    }
    if (!videoBlobUrl) {
      await fetchVideoUrl()
    }
    if (video.paused) {
        video.play();
        setIsPlaying(true);
      

    } else {
      video.pause();
      setIsPlaying(false);
    }
  };
  function handlePause() {
    const video = videoRef.current;
    if (!video.paused) {
      video.pause()
      setIsPlaying(false)
    }
  }



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
    setDuration(Math.ceil(video.duration / 60));
    setIsLoaded(true)
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
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  function handlePlayerReady() {
    setIsLoaded(true)
  }
  function handleWidth(type) {
    if (type == 'default') {
      return '375px'
    }
    else {
      return '241px'
    }
  }
  function handlHeight(type) {
    if (type == 'default') {
      return '205px'
    }
    else {
      return '410px'
    }
  }
  const videos = document.querySelectorAll('video');

  return (
    <div className={`${type == "default" ? 'Video-player-class-wrap' : 'Video-player-class-story-wrap'}`}>
      {/* {!isLoaded&&<Shimmer type={type}/>} */}
      {loading && (
        <span
          className='video_loader'
        >
        </span>
      )}

      <div>
        <video ref={videoRef}
          onLoadedData={handlePlayerReady}
          onLoadedMetadata={handleLoadedMetadata}
          onCanPlay={() => setMetaDataLoaded(true)}
          width={handleWidth(type)}
          height={handlHeight(type)}
          poster={!loading && poster?.src}
          disableRemotePlayback
          controls={false}
          disablepictureinpicture controlslist="nodownload noplaybackrate"
          preload='auto'
          src={videoBlobUrl}
          className={`${type == "default" ? 'Video-player-class' : 'Video-player-class-story'}`}>
        </video>
      </div>


      <div className='player_controls'>
        {isLoaded && !loading && <button className='btn-play'>
          {console.log(isPlaying, isLoaded, "is loaded")}
          {isPlaying ? <img onClick={handlePause} className='pause_btn' src='https://upload.wikimedia.org/wikipedia/commons/d/dc/Pause_Button_icon_Apple.svg' /> : <img onClick={handlePlay} src='https://143223961.fs1.hubspotusercontent-eu1.net/hubfs/143223961/raw_assets/public/Assets/Eucharistic%20Revival/play.svg' />}
        </button>}
        <div onClick={handleFullScreen} className='btn-fullscreen'>
          <img src='https://143223961.fs1.hubspotusercontent-eu1.net/hubfs/143223961/raw_assets/public/Assets/Eucharistic%20Revival/fullscreenIcon.svg' />
        </div>
      </div>
      {isLoaded && type == 'default' && <div className='title'>
        {metaDataLoaded && <p>{`${duration} mins watch`}</p>}
        <h1>{title && title}</h1>
      </div>}

    </div>

  )
}
export default CarouselDefaultPlayer