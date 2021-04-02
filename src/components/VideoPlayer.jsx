import React, { useState } from "react";
import Video from "../components/Video";
import Recorder from "./Recorder";
const VideoPlayer = () => {
  const [state, setState] = useState("preview");

  const onPreview = (
    <>
      <Video />
      <button onClick={() => setState("recording")}>Start Recording</button>
    </>
  );

  const onRecord = <Recorder />;

  return (
    <div className="video-player">
      {state === "preview" ? onPreview : null}
      {state === "recording" ? onRecord : null}
    </div>
  );
};

export default VideoPlayer;
