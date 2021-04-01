import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
  faRedo,
  faPhoneVolume,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
// import { TimingObject } from "timing-object";
// import { TimingProvider } from "timing-provider";
// import { setTimingsrc } from "timingsrc";

import sourceVideo from "../videos/src-vid.mp4";
// import vid from "../videos/1.mp4";
const Video = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoMetaData, setVideoMetaData] = useState({
    currentTime: 0,
    totalTime: 0,
    volume: 1,
  });
  const video1 = useRef(null);
  const video2 = useRef(null);

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
    setVideoMetaData({
      ...videoMetaData,
      currentTime: e.target.currentTime,
      totalTime: e.target.duration,
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
  return (
    <>
      <div className="video">
        <div className="vid">
          <video
            onVolumeChange={volumeHandler}
            onLoadedData={dataHandler}
            onTimeUpdate={timeHandler}
            ref={video1}
            src={sourceVideo}
          ></video>
          <video
            onEnded={endToggle}
            onLoadedData={dataHandler}
            onLoadedMetadata={timeHandler}
            ref={video2}
            src={sourceVideo}
            muted
          ></video>
        </div>
      </div>
      <div className="progress-bar">
        <input
          style={{ padding: 0 }}
          min={0}
          max={Math.floor(videoMetaData.totalTime)}
          value={videoMetaData.currentTime}
          type="range"
          name=""
          id=""
          onChange={progressHandler}
        />
      </div>
      <div className="controls">
        <p>
          {getTime(videoMetaData.currentTime) +
            " / " +
            getTime(videoMetaData.totalTime)}
        </p>
        <div className="volume-slider">
          <FontAwesomeIcon icon={faVolumeUp} size="1x" />
          <input
            type="range"
            min={0}
            max={1}
            step="0.1"
            onChange={handleVolumeChange}
            value={videoMetaData.volume}
            name=""
            id=""
          />
          <p>{videoMetaData.volume * 100 + "%"}</p>
        </div>
        <div className="control-btns">
          <FontAwesomeIcon icon={faRedo} size="2x" onClick={resetHandler} />
          <FontAwesomeIcon
            onClick={() => {
              skipHandler("backward");
            }}
            className="skip-back"
            icon={faAngleLeft}
            size="2x"
          />
          <FontAwesomeIcon
            onClick={playPauseHandler}
            className="play"
            icon={!isPlaying ? faPlay : faPause}
            size="2x"
          />
          <FontAwesomeIcon
            onClick={() => {
              skipHandler("forward");
            }}
            className="skip-forward"
            icon={faAngleRight}
            size="2x"
          />
        </div>
      </div>
    </>
  );
};

export default Video;
