import React, { useState } from "react";
import Video from "../components/Video";
import Recorder from "./Recorder";
import Save from "./Save";

import "bootstrap/dist/css/bootstrap.min.css";


const VideoPlayer = (props) => {
  const [state, setState] = useState("recording");

  const [video1, setVideo1] = useState(props.video1);
  const [video2, setVideo2] = useState(props.video2);

  const [handleDownloadFunction, setHandleDownloadFunction] = useState(null);

  const onPreview = (
    <>
      <Video video1={video1} video2={video2} />
      <button
        className="btn"
        onClick={() => {
          setState("recording");
        }}
      >
        Start Recording
      </button>
    </>
  );

  const onRecord = <Recorder changeVideo2={setVideo2} changeState={setState} setDownloadFunction={ setHandleDownloadFunction}/>;

  const onSave = (
    <Save
      video1={video1}
      video2={video2}
      downloadFunction={handleDownloadFunction}
    />
  );

  return (
    <>
      <div className="video-player">
        {state === "recording" ? onRecord : null}
        {state === "save" ? onSave : null}
        {state === "preview" ? onPreview : null}
      </div>
    </>
  );
};

export default VideoPlayer;
