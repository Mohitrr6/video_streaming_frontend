import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import TrendingPage from "./pages/TrendingPage/TrendingPage";
import UploadsPage from "./pages/UploadsPage/UploadPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/uploads" element={<UploadsPage />} />
      </Routes>
    </Router>
  )
}

export default App
