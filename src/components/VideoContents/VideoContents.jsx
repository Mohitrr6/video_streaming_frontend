import { useState,useEffect } from "react";

import HeaderBar from "../headerBar/HeaderBar";
import "./VideoContents.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/userSlice";
import { fetchvideos } from "../../redux/mediaSlice";
const VideoContents = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  useEffect(()=>{
    dispatch(fetchvideos())
  },[dispatch])
  
const {videos,loading,error}= useSelector((state)=>state.video);
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const user_email = e.target["email"].value;
    const user_pass = e.target["password"].value;
    
    
    const request_body = {
      "email":user_email,
      "password" : user_pass
    }
    if(mode !== 'login'){
      
      const user_name = e.target["name"].value;
      request_body.name = user_name;
      const response = await fetch('http://localhost:3000/api/auth/register',
        
        {
          "method":'POST',
          headers: {
            'content-type':'application/json'
          },
          "body":JSON.stringify(request_body)
        }
      )
      const result = await response.json();
      sessionStorage.setItem("token",result?.data?.token);
      console.log(result);
      navigate('/')


    } else{
      
      
      
      const response = await fetch('http://localhost:3000/api/auth/login',
        
        {
          "method":'POST',
          headers: {
            'content-type':'application/json'
          },
          "body":JSON.stringify(request_body)
        }
      )
      const result = await response.json();
      console.log("login result",result);
      if(result.success){

        localStorage.setItem("token",result?.data?.token);
        console.log(dispatch)
        console.log(login)
        dispatch(login(true));
        setModalOpen(false);
        navigate('/')
      }
    }

    
  }


  

  return (
    <div className="video-contents">
      <div className="video-toolbar">
        <HeaderBar
          onLoginClick={() => { setMode("login"); setModalOpen(true); }}
          onSignupClick={() => { setMode("signup"); setModalOpen(true); }}
        />
      </div>

      {loading ? (
        <div className="video-grid" aria-label="Loading videos">
          {[1, 2, 3, 4, 5, 6].map((item) => <div className="video-card-skeleton" key={item} />)}
        </div>
      ) : error ? (
        <p className="video-state">Unable to load videos. Please try again.</p>
      ) : videos.length === 0 ? (
        <p className="video-state">No videos available yet.</p>
      ) : (
        <ul className="video-grid">
          {videos.map((video) => (
            <li className="video-card" key={video?.video_id} onClick={() => navigate(`watch/${video?.video_id}`)}>
              <div className="video-thumbnail-wrap">
                <img
                  className="video-thumbnail"
                  src={`http://localhost:3000/api/media/${video.video_id}/thumbnail`}
                  alt={video?.video_name || "Video thumbnail"}
                />
                <span className="video-play" aria-hidden="true">▶</span>
              </div>
              <div className="video-card-body">
                <h3>{video?.video_name || "Untitled video"}</h3>
                <p>{video?.video_desc || "No description available."}</p>
              </div>
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

            <form className="auth-form" onSubmit={handleSubmit}>
              <input type="email" placeholder="Email" name="email"/>
              <input type="password" placeholder="Password" name = "password"/>
              {mode === "signup" && <input type="text" name = 'name' placeholder="Full Name" />}
              <button>
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
