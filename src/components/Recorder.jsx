import { useState, useRef } from "react";
import Webcam from "react-webcam";
import useWebcamRecorder from "../hooks/useWebcamRecorder";
import sourceVideo from "../videos/src-vid.mp4";
import "../styles/recorder.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPauseCircle,
  faStop,
  faStopCircle,
  faStopwatch,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

import Instructions from "./Instructions";

export default function Recorder(props) {
  const [isRecording, setIsRecording] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  // webcam custom hook
  const [
    webcamRef,
    startRecording,
    togglePause,
    stopRecording,
    downloadRecording,
    getRecordedUrl,
  ] = useWebcamRecorder();

  const handleStart = async () => {
    setIsRecording(true);
    startRecording();
    sourceVideoRef.current.play();
  };

  function handlePause() {
    togglePause();
    if (isRecording) {
      sourceVideoRef.current.pause();
      webcamRef.current.video.pause();
    } else {
      sourceVideoRef.current.play();
      webcamRef.current.video.play();
    }
    setIsRecording(!isRecording);
  }

  function handleStop() {
    setIsRecording(false);
    setIsComplete(true);
    stopRecording();
    sourceVideoRef.current.pause();
    webcamRef.current.video.pause();
  }

  function handleCompare() {
    const recordedUrl = getRecordedUrl();
    props.changeVideo2(recordedUrl);
    props.changeState("preview");
    
    props.setDownloadFunction(downloadRecording);
  }

  const sourceVideoRef = useRef(null);
  return (
    <>
      <div className="vid-container-recording">
        <div className="vid-viewer-record">
          <div className="video1-record">
            <video
              ref={sourceVideoRef}
              src={sourceVideo}
              onEnded={handleStop}
            ></video>
            <p className="vid-info">Class 1: FreeStyle Basics</p>
          </div>
          <div className="video2-record">
            <Webcam ref={webcamRef} onUserMedia={handleStart} />
            <div className="recorder-controls">
              <button className="btn-recorder m-1" onClick={handleStop}>
                <div className="border-stop">
                  <FontAwesomeIcon icon={faStop} size="1x"></FontAwesomeIcon>
                </div>
                <span className="record-button-text"> Stop</span>
              </button>

              <button className="btn-recorder m-1" onClick={handlePause}>
                <div className="border-stop">
                  <FontAwesomeIcon
                    icon={isRecording ? faPause : faPlay}
                    size="1x"
                  ></FontAwesomeIcon>
                </div>
                <span className="record-button-text">
                  {isRecording ? "Pause" : "Resume"}
                </span>
              </button>
              {isComplete && (
                <button className="btn m-1" onClick={handleCompare}>
                  Compare recording
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
