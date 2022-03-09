function VideoContainer(props) {
  console.log(props);
  return (
    <li key={props.code}>
      <p>Video is loading!</p>
      <iframe
        width="100%"
        height="100%"
        src={
          "https://www.youtube.com/embed/" + props.code + "?wmode=transparent"
        }
        title="YouTube video player"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </li>
  );
}

export default VideoContainer;
