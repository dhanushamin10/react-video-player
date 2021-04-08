import { useState } from "react";
import Toast from "react-bootstrap/Toast";
import DownloadedModal from "./DownloadedModal";
import "../styles/save.scss";

import sourceVideo from "../videos/src-vid.mp4";

export default function Recorder(props) {
  const [showDownloadedModal, setShowDownloadedModal] = useState(false);

  function downloadVideo() {
    // props.downloadFunction();
    setShowDownloadedModal(true);
  }

  return (
    <>
      {showDownloadedModal ? <DownloadedModal /> : null}

      <div className="save-container">
        <div className="save-viewer">
          <div className="video1">
            <video src={sourceVideo}></video>
            <span className="video-name">Class 1: Jazz: Intro to Basics </span>
          </div>
          <div className="video2">
            <video src={sourceVideo}></video>
            <span className="video-name">Class 1: Jazz: Intro to Basics </span>
          </div>
        </div>

        <Toast>
          <Toast.Header closeButton={false}>
            <strong>Wohoo!</strong>
          </Toast.Header>
          <Toast.Body>
            <div>
              <span>
                You have completed the Practice video. Do you want to save this
                video?
              </span>
              <div className="yesNo-buttons">
                <button className="btn" onClick={downloadVideo}>
                  Yes
                </button>
                <button className="btn">No</button>
              </div>
            </div>
          </Toast.Body>
        </Toast>
      </div>
    </>
  );
}
