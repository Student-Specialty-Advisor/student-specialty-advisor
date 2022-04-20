function VideoContainer(props) {
  return (
    <li key={props.code}>
      <p>Video is loading!</p>
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
