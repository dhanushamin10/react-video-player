import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faForward,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";

import { MediaElementSyncer } from "media-element-syncer";

const Video = (props) => {
  const video1 = useRef(null);
  const video2 = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [videoMetaData, setVideoMetaData] = useState({
    currentTime: 0,
    totalTime: 0,
    volume: 1,
  });

  const playPauseHandler = () => {
    if (isPlaying) {
      video1.current.pause();
    } else {
      video1.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const timeHandler = (e) => {
    const syncer = new MediaElementSyncer(video1.current);
    syncer.addChild(video2.current);

    setVideoMetaData({
      ...videoMetaData,
      currentTime: e.target.currentTime,
      totalTime: e.target.duration,
    });
  };

  const skipHandler = (direction) => {
    let timeDiff = direction === "forward" ? 1 : -1;

    // when paused, make both videos go forward/backward
    video1.current.currentTime = video1.current.currentTime + timeDiff;

    setVideoMetaData({
      ...videoMetaData,
      currentTime: videoMetaData.currentTime + timeDiff,
    });
  };

  const endToggle = () => {
    setIsPlaying(false);
    video1.current.currentTime = 0;
    video1.current.pause();
  };

  const volumeHandler = (e) => {
    setVideoMetaData({ ...videoMetaData, volume: e.target.volume });
  };

  const loadedVideoHandler = (e) => {
    const syncer = new MediaElementSyncer(video1.current);
    syncer.addChild(video2.current);

    setVideoMetaData({
      ...videoMetaData,
      currentTime: e.target.currentTime,
      totalTime: e.target.duration,
    });
  };

  return (
    <>
      <div className="vid-container">
        <div className="vid-controls">
          <VideoControlDblClick
            callback={() => {
              skipHandler("backward");
            }}
            name="back"
          >
            <div className="icon-container">
              <FontAwesomeIcon icon={faBackward} size="2x" />
              <span className="control-info">-1 second</span>
            </div>
          </VideoControlDblClick>

          <div className="vid-controls-center" onClick={playPauseHandler}>
            {!isPlaying && <FontAwesomeIcon icon={faPlay} size="3x" />}
          </div>

          <VideoControlDblClick
            callback={() => {
              skipHandler("forward");
            }}
            name="front"
          >
            <div className="icon-container">
              <FontAwesomeIcon icon={faForward} size="2x" />
              <span className="control-info">+1 second</span>
            </div>
          </VideoControlDblClick>
        </div>
        {!isPlaying && <div className="vid-paused-overlay"></div>}
        <div className="vid-viewer">
          <div className="video1">
            <video
              onVolumeChange={volumeHandler}
              onLoadedMetadata={loadedVideoHandler}
              onTimeUpdate={timeHandler}
              ref={video1}
              src={props.video1}
            ></video>
          </div>
          <div className="video2">
            <video
              onEnded={endToggle}
              onLoadedMetadata={loadedVideoHandler}
              ref={video2}
              src={props.video2}
              muted
            ></video>
          </div>
        </div>
      </div>
    </>
  );
};

function VideoControlDblClick(props) {
  const [isClicked, setIsClicked] = useState(false);

  const doubleClickFunction = (event) => {
    event.preventDefault();

    setIsClicked(true);

    props.callback();
  };

  useEffect(() => {
    if (isClicked) setTimeout(() => setIsClicked(false), 300);
  }, [isClicked]);

  return (
    <div className={`vid-controls-${props.name}`} onClick={doubleClickFunction}>
      {isClicked && props.children}
    </div>
  );
}

export default Video;
