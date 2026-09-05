import "@videojs/react/video/skin.css";
import { VideoPlayer, VideoSkin, Video } from "@videojs/react/video";

export const VideoPlayer = ({ src }) => {
  return (
    <VideoPlayer>
      <VideoSkin>
        <Video src={src} playsInline />
      </VideoSkin>
    </VideoPlayer>
  );
};
