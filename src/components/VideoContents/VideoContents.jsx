import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import "./VideoContents.css";

const VideoContents = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("login");
  let videoData = [];

  return (
    <div className="video-contents">
      <div className="video-toolbar">
        <div className="video-search-bar">
          <SearchBar />
        </div>
        <div className="auth-buttons">
          <button className="login-btn" onClick={() => { setMode("login"); setModalOpen(true); }}>
            Login
          </button>
          <button className="signup-btn" onClick={() => { setMode("signup"); setModalOpen(true); }}>
            Sign Up
          </button>
        </div>
      </div>

      {videoData.length === 0 ? (
        <div className="dummy-video-grid">
          <div className="dummy-videos"></div>
          <div className="dummy-videos">adasd</div>
          <div className="dummy-videos">adasd</div>
          <div className="dummy-videos"></div>
        </div>
      ) : (
        <ul>
          {videoData.map((video) => (
            <li key={video.id}>
              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </li>
          ))}
        </ul>
      )}

      {modalOpen && (
        <div className="auth-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <div className="auth-modal-header">
              <h3>{mode === "login" ? "Login" : "Sign Up"}</h3>
              <button className="close-btn" onClick={() => setModalOpen(false)}>
                ×
              </button>
            </div>

            <div className="auth-tabs">
              <button
                className={mode === "login" ? "tab-btn active" : "tab-btn"}
                onClick={() => setMode("login")}
              >
                Login
              </button>
              <button
                className={mode === "signup" ? "tab-btn active" : "tab-btn"}
                onClick={() => setMode("signup")}
              >
                Sign Up
              </button>
            </div>

            <form className="auth-form">
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              {mode === "signup" && <input type="text" placeholder="Full Name" />}
              <button className="submit-btn" type="submit">
                {mode === "login" ? "Login" : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoContents;
