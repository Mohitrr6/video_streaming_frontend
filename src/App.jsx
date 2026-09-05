import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import TrendingPage from "./pages/TrendingPage/TrendingPage";
import UploadsPage from "./pages/UploadsPage/UploadPage";
import VideoWatchPage from "./pages/WatchPage/VideoWatchPage"
import "./App.css";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function App() {
  const {isLoggedIn} = useSelector((state) => state.user);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trending" element={<TrendingPage />} />
        
        <Route path="/uploads" element={isLoggedIn ? <UploadsPage /> : <Navigate to="/" replace />} />
        <Route path="/watch/:videoId" element={<VideoWatchPage />} />

        
        
      </Routes>
    </Router>
  )
}

export default App
