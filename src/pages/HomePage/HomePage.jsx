import Sidebar from "../../components/Sidebar";
import VideoContent from "../../components/VideoContents/VideoContents";
import "./HomePage.css";


const HomePage = () => {
  
  return (
    <div className="home-page">
      <div className="sidebar-section">
        <Sidebar />
      </div>
      <div className="content-section">
        <VideoContent />
      </div>
    </div>
  )
}

export default HomePage