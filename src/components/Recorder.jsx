import { useRef } from "react";
import Webcam from "react-webcam";
import useWebcamRecorder from "../hooks/useWebcamRecorder";
import sourceVideo from "../videos/src-vid.mp4";

export default function Recorder(props) {
  const [
    webcamRef,
    startRecording,
    stopRecording,
    downloadRecording,
    getRecordedUrl
  ] = useWebcamRecorder();

  function handleStart() {
    startRecording();
    sourceVideoRef.current.play();
  }

  function handleStop() {
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
          <video ref={sourceVideoRef} src={sourceVideo}></video>
          <Webcam ref={webcamRef} onUserMedia={handleStart} />
        </div>
      </div>
      <div className="video-controls">
        <div className="controls">
          <button onClick={handleStop}>Stop Recording</button>
          <button onClick={downloadRecording}>Download Recording</button>
          <button onClick={handleCompare}>Compare recording</button>
        </div>
      </div>
    </>
  );
}
