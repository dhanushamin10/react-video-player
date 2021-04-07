import Navbar from "./components/navbar";
import VideoPlayer from "./components/VideoPlayer";
import Header from './components/Header'
import "./styles/app.scss";
import sourceVideo from "./videos/src-vid.mp4";
import { useState } from "react";
function App() {
  const [progressStep, setProgressStep] = useState(0);
  return (
    <div className="App">
      <Navbar />
      <Header step={progressStep} setProgressStep={setProgressStep} />
      <VideoPlayer
        step={progressStep}
        setProgressStep={setProgressStep}
        video1={sourceVideo}
        video2={sourceVideo}
      />
    </div>
  );
}

export default App;
