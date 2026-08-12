import Sidebar from "../../components/sidebar";
import "./TrendingPage.css";

const TrendingPage = () => {
  return (
    <div className="trending-page">
      <div className="trending-sidebar">
        <Sidebar />
      </div>
      <div className="trending-content">
        <h1>Trending Videos</h1>
        <p>
          Discover what is popular right now. This area highlights the latest
          trending videos and the topics people are watching the most.
        </p>
      </div>
    </div>
  )
};

export default TrendingPage;
