import { useState, useRef } from "react";
import Webcam from "react-webcam";
import useWebcamRecorder from "../hooks/useWebcamRecorder";
import sourceVideo from "../videos/src-vid.mp4";
import "../styles/recorder.scss";

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
  }

  const sourceVideoRef = useRef(null);
  return (
    <>
      <div className="vid-container">
        <div className="vid-viewer">
          <div className="video1">
            <video
              ref={sourceVideoRef}
              src={sourceVideo}
              onEnded={handleStop}
            ></video>
          </div>
          <div className="video2">
            <Webcam ref={webcamRef} onUserMedia={handleStart} />
          </div>
        </div>
      </div>
      <div className="recorder-controls">
        <button className="btn m-1" onClick={handleStop}>
          Stop Recording
        </button>
        <button className="btn m-1" onClick={handlePause}>
          {isRecording ? "Pause" : "Resume"} Recording
        </button>
        {isComplete && (
          <button className="btn m-1" onClick={handleCompare}>
            Compare recording
          </button>
        )}
      </div>
    </>
  );
}
