import styled from 'styled-components';
import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlayButtonSvg from '../assets/PlayButton.svg';
import PauseButtonSvg from '../assets/PauseButton.svg';
import SpeakerIcon from '../assets/Speaker_Icon.svg';
import FullScreenIcon from '../assets/FullScreen.svg';
import FullScreenExitIcon from '../assets/FullScreenExit.svg';
import flv from 'flv.js';
import { useState } from 'react';
import { selectUserInfo } from '../store/UserSlice.js';
import { selectSoundVolume, setLiveProperty, setSoundVolume } from '../store/StreamSlice';
import { selectFullScreenProperty, setFullScreenProperty } from '../store/StreamSliceNotPersisted';

function launchIntoFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else {
    element.classList.toggle('fullscreen');
  }
}

function VideoPlayer() {
  const dispatch = useDispatch();
  let soundVolumeRedux = useSelector(selectSoundVolume);
  let isFullScreen = useSelector(selectFullScreenProperty);
  let userInfo = useSelector(selectUserInfo);
  let flvPlayer = useRef(null);
  const loadTimeout = useRef(0);
  let fullscreenElement = useRef(
    document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
  );
  const videoPlayerRef = useRef(0);
  const videoRef = useRef(0);
  const pauseElapsedTime = useRef(0);
  const [isPlaying, setIsPlaying] = useState(0);
  const [isSoundHovered, setSounHover] = useState(0);

  const [isVPlayerHovered, setVPlayerMousePosition] = useState(0);

  useEffect(() => {
    document.addEventListener('fullscreenchange', fullscreenchanged);
    flvPlayer.current = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${userInfo.userStreamKey}.flv`,
      isLive: true
    }); //TODO: remove logging
    dispatch(setLiveProperty(flvPlayer.current._mediaInfo != null));
    flvPlayer.current.attachMediaElement(videoRef.current);
    flvPlayer.current.load();
    return () => {
      flvPlayer.current.unload();
      flvPlayer.current.detachMediaElement();
      // document.removeEventListener(
      //   'keydown',
      //   (event) => {
      //     if (event.key == 'Escape') {
      //       dispatch(setFullScreenProperty(0));
      //     }
      //   },
      //   false
      // );
    };
  }, []);
  useEffect(() => {
    videoRef.current.volume = soundVolumeRedux / 100;
  }, [soundVolumeRedux]);
  const handlePlayButtonClick = (e) => {
    console.log(flvPlayer.current);
    e.stopPropagation();

    dispatch(setLiveProperty(flvPlayer.current._mediaInfo != null));

    if (isPlaying) {
      flvPlayer.current.pause();
      loadTimeout.current = setInterval(() => {
        pauseElapsedTime.current += 50;
        if (pauseElapsedTime.current >= 5000) {
          clearInterval(loadTimeout.current);

          flvPlayer.current.detachMediaElement();
          flvPlayer.current.unload();
        }
      }, 50);

      setIsPlaying(0);
    } else {
      clearInterval(loadTimeout.current);
      if (pauseElapsedTime.current >= 5000) {
        flvPlayer.current.attachMediaElement(videoRef.current);
        flvPlayer.current.load();
        pauseElapsedTime.current = 0;
      }
      flvPlayer.current.play();
      setIsPlaying(1);
    }
  };
  const fullscreenchanged = () => {
    // document.fullscreenElement will point to the element that
    // is in fullscreen mode if there is one. If not, the value
    // of the property is null.
    if (document.fullscreenElement) {
      dispatch(setFullScreenProperty(1));
    } else {
      dispatch(setFullScreenProperty(0));
    }
  };
  const handleVolumeInputChange = (e) => {
    // videoRef.current[0].volume = e.target.value;
    dispatch(setSoundVolume(e.target.value));
    //setSoundVolume(e.target.value);
  };
  const handleFullScreenClick = (e) => {
    e.stopPropagation();
    fullscreenElement.current =
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement;

    if (fullscreenElement.current) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    } else {
      launchIntoFullscreen(videoPlayerRef.current);
      dispatch(setFullScreenProperty(1));

      // document.addEventListener(
      //   'keydown',
      //   (event) => {
      //     if (event.key == 'Escape') {
      //       console.log('eyeyey');
      //       dispatch(setFullScreenProperty(0));
      //     }
      //   },
      //   false
      // );
    }
  };

  return (
    <VideoPlayerStyled
      onMouseEnter={() => setVPlayerMousePosition(1)}
      onMouseLeave={() => setVPlayerMousePosition(0)}
      ref={videoPlayerRef}>
      <video
        id="videoElement"
        onClick={handlePlayButtonClick}
        onDoubleClick={handleFullScreenClick}
        ref={videoRef}></video>
      {userInfo.userStreamKey === '' && <div id="user-key-warning">Specify Stream Key</div>}
      {flvPlayer.current != null &&
        userInfo.userStreamKey != '' &&
        flvPlayer.current._mediaInfo === null && (
          <div id="user-key-warning">No stream detected</div>
        )}
      {isVPlayerHovered == 1 && (
        <div id="video-player-interface">
          <div className="player-separator">
            <button onClick={handlePlayButtonClick}>
              {isPlaying ? (
                <img height={20} width={20} src={PauseButtonSvg} alt="play" />
              ) : (
                <img height={20} width={20} src={PlayButtonSvg} alt="play" />
              )}
            </button>
            <div
              id="audio-params"
              onMouseEnter={() => setSounHover(1)}
              onMouseLeave={() => setSounHover(0)}>
              <button>
                <img height={25} width={25} src={SpeakerIcon} alt="play" />
              </button>
              {isSoundHovered == 1 && (
                <input
                  onChange={handleVolumeInputChange}
                  value={soundVolumeRedux}
                  type={'range'}
                  min="0"
                  max="100"
                  step="1"></input>
              )}
            </div>
          </div>
          <div className="player-separator">
            <button onClick={handleFullScreenClick}>
              <img
                height={25}
                src={isFullScreen ? FullScreenExitIcon : FullScreenIcon}
                alt="play"
              />
            </button>
          </div>
        </div>
      )}
      {/*TODO: integrate inputs inside video tag */}
    </VideoPlayerStyled>
  );
}

const VideoPlayerStyled = styled.div`
  display: flex;
  margin-top: 4rem;
  justify-content: center;
  box-shadow: 0px 0px 40px -20px black;
  position: relative;
  .player-separator {
    display: flex;
    align-items: center;
  }
  & input[type='range'] {
    background: #44444d;
  }
  #audio-params {
    display: flex;
    align-items: center;
  }
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #ff4500;
    box-shadow: 0 0 2px 0 #555;
    transition: background 0.3s ease-in-out;
  }
  input[type='range']::-webkit-slider-thumb:hover {
    background: #ff0200;
  }
  & video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: #d9d9d9;
  }
  #video-player-interface {
    display: flex;
    position: absolute;
    //width: 1000px;
    width: 100%;
    background: linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.4));
    align-self: flex-end;
    padding-bottom: 0.4rem;
    justify-content: space-between;
    transition: background 0.25s;
    z-index: 1;
  }

  & img {
    filter: invert(91%) sepia(35%) saturate(0%) hue-rotate(231deg) brightness(99%) contrast(93%);
    padding: 0.2rem 0.2rem 0rem 0.2rem;
  }
  & button {
    padding: 0rem;
    margin-left: 0.7rem;
    border: 0rem solid;
    background-color: transparent;
    border-radius: 5px;
    transition: background-color 0.25s;
  }
  button:hover {
    background-color: rgba(116, 116, 116, 0.445);
  }
  & button:focus,
  & button:focus-visible {
    outline: none;
    background-color: rgba(175, 175, 175, 0.445);
  }

  #user-key-warning {
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
    position: absolute;
    background-color: #242424;
    border-radius: 5px;
    padding: 1rem 1rem 1rem 1rem;
    color: #f19191;
    align-self: center;
    z-index: 2;
  }
`;

export default VideoPlayer;
