import { Skeleton } from "@mui/material";

function VideoContainer(props) {
  return (
    <li key={props.code}>
      <Skeleton
        className="video-skeleton"
        width="100%"
        height="100%"
        variant="rectangular"
        animation="wave"
        sx={{ bgcolor: "var(--mydarkblue)" }}
      />
      <iframe
        width="100%"
        height="100%"
        src={
          "https://www.youtube.com/embed/" +
          props.code +
          "?wmode=transparent&vq=hd1080"
        }
        title={props.title}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </li>
  );
}

export default VideoContainer;
