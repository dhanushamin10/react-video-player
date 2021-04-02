import { useRef } from 'react';
import Webcam from 'react-webcam';
import useWebcamRecorder from '../hooks/useWebcamRecorder';
import sourceVideo from '../videos/src-vid.mp4';

export default function Recorder() {
  const [
    webcamRef,
    startRecording,
    stopRecording,
    downloadRecording,
  ] = useWebcamRecorder();

  function handleStart() {
    startRecording();
    sourceVideoRef.current.play();
  }

  function handleStop() {
    stopRecording();
    sourceVideoRef.current.pause();
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
        </div>
      </div>
    </>
  );
}
