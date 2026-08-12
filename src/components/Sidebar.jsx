import { FaHome } from "react-icons/fa";
import { IoIosTrendingUp } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import "./Sidebar.css";
import {useState} from "react";

const Sidebar = () => {
  const {isLoggedIn} = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("home");
  // console.log("isLoggedIn",isLoggedIn);
  let navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">S</div>
        <div>
          <h2>Streamz</h2>
          <p>Watch. Upload. Share.</p>
        </div>
      </div>

      <ul className="sidebar-nav">
        <li className={activeTab === "home" ? "active" : ""} onClick={() => {
          navigate("/");
          setActiveTab("home");
        }}>
          <span className="nav-icon">
            <FaHome />
          </span>
          
            Home
          
        </li>
        <li className={activeTab === "trending" ? "active" : ""} onClick={() => {
          navigate("/trending");
          setActiveTab("trending");
        }}>
          <span className="nav-icon">
            <IoIosTrendingUp />
          </span>
          Trending
        </li>
        {isLoggedIn && (
        <li className={activeTab === "my-videos" ? "active" : ""} onClick={() => {
          navigate("/my-videos");
          setActiveTab("my-videos");
        }}>
          <span className="nav-icon">
            <FaVideo />
          </span>
          My Videos
        </li>)}
        {isLoggedIn && (
        <li 
          className={activeTab === "uploads" ? "active" : ""} 
          onClick={() => {
            navigate("/uploads");
            setActiveTab("uploads");
        }}>
          <span className="nav-icon">
            <FaVideo />
          </span>
          Upload Videos
        </li>)}
      </ul>
    </div>
  );
};

export default Sidebar;