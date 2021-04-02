import React, { useState } from "react";
import Video from "../components/Video";
import Recorder from "./Recorder";
const VideoPlayer = () => {
  const [state, setState] = useState('recording')
  return (
    <div className="video-player">
      {state === 'preview' && <Video />}
      {state === 'recording' && <Recorder />}
    </div>
  );
};

export default VideoPlayer;
