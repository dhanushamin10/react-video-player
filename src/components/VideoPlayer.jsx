import React, { useState } from "react";
import Video from "../components/Video";
import Recorder from "./Recorder";
const VideoPlayer = (props) => {
  const [state, setState] = useState("preview");

  const [video1, setVideo1] = useState(props.video1);
  const [video2, setVideo2] = useState(props.video2);

  const onPreview = (
    <>
      <Video video1={video1} video2={video2} />
      <button
        onClick={() => {
          setState("recording");
        }}
      >
        Start Recording
      </button>
    </>
  );

  const onRecord = <Recorder changeVideo2={setVideo2} changeState={setState} />;

  return (
    <div className="video-player">
      {state === "preview" ? onPreview : null}
      {state === "recording" ? onRecord : null}
    </div>
  );
};

export default VideoPlayer;
