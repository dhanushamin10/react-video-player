import React from "react";

export default function useWebcamRecorder() {
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [recordedChunks, setRecordedChunks] = React.useState([]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) setRecordedChunks((prev) => prev.concat(data));
    },
    [setRecordedChunks]
  );

  const handleStartCapture = React.useCallback(() => {
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream);
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [handleDataAvailable, webcamRef, mediaRecorderRef]);

  const handlePauseToggle = React.useCallback(() => {
    if (mediaRecorderRef.current.state === "recording")
      mediaRecorderRef.current.pause();
    else if (mediaRecorderRef.current.state === "paused")
      mediaRecorderRef.current.resume();
  }, [mediaRecorderRef]);

  const handleStopCapture = React.useCallback(() => {
    mediaRecorderRef.current.stop();
  }, [mediaRecorderRef]);

  const handleDownload = React.useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/mp4",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "my-recording.mp4";
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }, [recordedChunks]);

  const getRecordedUrl = React.useCallback(() => {
    const blob = new Blob(recordedChunks, {
      type: "video/mp4",
    });
    const url = URL.createObjectURL(blob);
    setRecordedChunks([]);
    return url;
  }, [recordedChunks]);

  return [
    webcamRef,
    handleStartCapture,
    handlePauseToggle,
    handleStopCapture,
    handleDownload,
    getRecordedUrl,
  ];
}
