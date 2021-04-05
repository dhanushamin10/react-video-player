import { useState, useRef } from "react";
import Webcam from "react-webcam";
import useWebcamRecorder from "../hooks/useWebcamRecorder";
import sourceVideo from "../videos/src-vid.mp4";

export default function Recorder(props) {
  const [isRecording, setIsRecording] = useState(false);
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
    // const recordingTime = Math.floor(sourceVideoRef.current.duration); //testing purpose -> 5.0
    // while (Math.floor(sourceVideoRef.current.currentTime) !== recordingTime) {
    //   await new Promise((r) => setTimeout(r, 10)); // sleep .1 second
    // }
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
      <div className="video">
        <div className="vid">
          <video
            ref={sourceVideoRef}
            src={sourceVideo}
            onEnded={handleStop}
          ></video>
          <Webcam ref={webcamRef} onUserMedia={handleStart} />
        </div>
      </div>
      <div className="video-controls">
        <div className="controls">
          <button onClick={handleStop}>Stop Recording</button>
          <button onClick={handlePause}>
            {isRecording ? "Pause" : "Resume"} Recording
          </button>
          <button onClick={downloadRecording}>Download Recording</button>
          <button onClick={handleCompare}>Compare recording</button>
        </div>
      </div>
    </>
  );
}
