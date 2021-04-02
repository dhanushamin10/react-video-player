import Navbar from "./components/navbar";
import VideoPlayer from "./components/VideoPlayer";
import "./styles/app.scss";
import sourceVideo from "./videos/src-vid.mp4";
function App() {
  return (
    <div className="App">
      <Navbar />
      <VideoPlayer video1={sourceVideo} video2={sourceVideo} />
    </div>
  );
}

export default App;
