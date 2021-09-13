const Video = ({ href }) => {
  return (
    <video width="320" height="240" src={href} type="video/mp4" controls>
        Your browser does not support the video tag.
    </video>
  );
}

export default Video;