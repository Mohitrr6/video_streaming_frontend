
import "@videojs/react/video/skin.css";
import { VideoPlayer, VideoSkin } from "@videojs/react/video";
import { HlsJsVideo } from "@videojs/react/media/hlsjs-video";
import "./VideoPlayer.css";

const videoPlayer = ({ src }) => {
  return (
    <div className="streamz-video-player">
      <VideoPlayer>
        <VideoSkin>
          <HlsJsVideo src={src} playsInline />
        </VideoSkin>
      </VideoPlayer>
    </div>
  );
};

export default videoPlayer;
