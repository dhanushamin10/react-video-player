import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faRedo,
  faVolumeUp,
  faForward,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";

const Video = (props) => {
  const video1 = useRef(null);
  const video2 = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoMetaData, setVideoMetaData] = useState({
    currentTime: 0,
    totalTime: 0,
    volume: 1,
    progressPercentage: 0,
  });
  const playPauseHandler = () => {
    if (isPlaying) {
      video1.current.pause();
      video2.current.pause();
    } else {
      video1.current.play();
      video2.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const timeHandler = (e) => {
    const currentTimeRounded = Math.round(e.target.currentTime);
    const durationRounded = Math.round(e.target.duration);
    const progressPercentage = Math.round(
      (currentTimeRounded / durationRounded) * 100
    );

    setVideoMetaData({
      ...videoMetaData,
      currentTime: e.target.currentTime,
      totalTime: e.target.duration,
      progressPercentage,
    });
  };
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const progressHandler = (e) => {
    video1.current.currentTime = e.target.value;
    video2.current.currentTime = e.target.value;
    setVideoMetaData({ ...videoMetaData, currentTime: e.target.value });
  };
  const skipHandler = (direction) => {
    if (direction === "forward") {
      video1.current.currentTime = video1.current.currentTime + 1;
      video2.current.currentTime = video2.current.currentTime + 1;
      setVideoMetaData({
        ...videoMetaData,
        currentTime: videoMetaData.currentTime + 1,
      });
    } else {
      video1.current.currentTime = video1.current.currentTime - 1;
      video2.current.currentTime = video2.current.currentTime - 1;
      setVideoMetaData({
        ...videoMetaData,
        currentTime: videoMetaData.currentTime + 1,
      });
    }
  };
  const dataHandler = () => {
    var d = new Date();
    var n = d.getTime();
    console.log(n);
  };
  const endToggle = () => {
    setIsPlaying(false);
    video1.current.currentTime = 0;
    video2.current.currentTime = 0;
    video1.current.pause();
    video2.current.pause();
  };
  const volumeHandler = (e) => {
    setVideoMetaData({ ...videoMetaData, volume: e.target.volume });
  };
  const handleVolumeChange = (e) => {
    setVideoMetaData({ ...videoMetaData, volume: e.target.value });
    video1.current.volume = e.target.value;
  };
  const resetHandler = () => {
    setVideoMetaData({ ...videoMetaData, currentTime: 0 });
    video1.current.currentTime = 0;
    video2.current.currentTime = 0;
  };
  const trackAnimation = {
    transform: `translateX(${videoMetaData.progressPercentage}%)`,
  };
  return (
    <>
      <div className="vid-container">
        <div className="vid-controls">
          <div
            className="vid-controls-back"
            onDoubleClick={() => skipHandler("backward")}
          ></div>
          <div className="vid-controls-center" onClick={playPauseHandler}></div>
          <div
            className="vid-controls-front"
            onDoubleClick={() => skipHandler("forward")}
          ></div>
        </div>
        <div className="vid-viewer">
          <div className="video1">
            <video
              onVolumeChange={volumeHandler}
              onLoadedData={dataHandler}
              onLoadedMetadata={timeHandler}
              onTimeUpdate={timeHandler}
              ref={video1}
              src={props.video1}
            ></video>
          </div>
          <div className="progress">
            <div className="progress-filled"></div>
          </div>
          <div className="video2">
            <video
              onEnded={endToggle}
              onLoadedData={dataHandler}
              onLoadedMetadata={timeHandler}
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

export default Video;
