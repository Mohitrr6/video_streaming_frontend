import { useEffect } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { useParams ,useNavigate} from 'react-router-dom';

import videoPlayer from '../../components/videoPlayer/VideoPlayer';
import HeaderBar from '../../components/headerBar/HeaderBar';
import { fetchvideos } from '../../redux/mediaSlice';
import './VideoWatchPage.css';

const VideoWatchPage = () => {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { videos, loading } = useSelector((state) => state.video);

  useEffect(() => {
    dispatch(fetchvideos());
  }, [dispatch]);

  const suggestedVideos = videos.filter((video) => video.video_id !== (videoId));

  return (
    <div className="video-watch-page-wrapper">
      <HeaderBar />
      <div className="video-watch-page">
        <div className="video-player-section">
          {videoPlayer({ src: `${import.meta.env.VITE_BACKEND_URL}/api/media/${videoId}/manifest` })}
        </div>

        <aside className="video-side-panel">
          <h3>More Videos</h3>
          {loading ? (
            <p className="video-side-loading">Loading videos...</p>
          ) : suggestedVideos.length === 0 ? (
            <p className="video-side-loading">No more videos available.</p>
          ) : (
            <ul className="video-side-list">
              {suggestedVideos.map((video) => (
                <li className="video-side-item" key={video.video_id} onClick={()=>navigate(`/watch/${video?.video_id}`)}>
                  <img
                    className="video-side-thumb"
                    src={`${import.meta.env.VITE_BACKEND_URL}/api/media/${video.video_id}/thumbnail`}
                    alt={video.video_name || 'Video thumbnail'}
                  />
                  <div className="video-side-meta">
                    <h4>{video.video_name || 'Untitled video'}</h4>
                    <p>{video.video_desc || 'No description available.'}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </div>
  );
};

export default VideoWatchPage;
