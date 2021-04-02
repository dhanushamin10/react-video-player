import React from "react";

export default function useWebcamRecorder() {
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const [recordedUrl, setRecordedUrl] = React.useState("");

  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream);
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/mp4",
      });
      setRecordedUrl(URL.createObjectURL(blob));
      setRecordedChunks([]);
    }
  }, [mediaRecorderRef, webcamRef, setCapturing, setRecordedUrl]);

  const handleDownload = React.useCallback(() => {
    if (recordedUrl.length !== 0) {
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = recordedUrl;
      a.download = "my-recording.mp4";
      a.click();
    }
  }, [recordedChunks, recordedUrl]);

  const getRecordedUrl = React.useCallback(() => recordedUrl, [recordedUrl]);

  return [
    webcamRef,
    handleStartCaptureClick,
    handleStopCaptureClick,
    handleDownload,
    getRecordedUrl,
  ];
}
