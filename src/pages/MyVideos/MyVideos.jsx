import Sidebar from "../../components/sidebar";
import "./MyVideos.css";

const MyVideos = () => {
  return (
    <div className="my-videos-page">
      <div className="my-videos-sidebar">
        <Sidebar />
      </div>
      <div className="my-videos-content">
        <h1>My Videos</h1>
        <p>
          This is your personal video library. You can manage uploads, review your
          content, and keep track of your latest uploads here.
        </p>
      </div>
    </div>
  );
};

export default MyVideos;
