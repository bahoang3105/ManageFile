const Audio = ({ href }) => {
  return (
    <audio src={href} type="audio/mpeg" controls>
      Your browser does not support the audio element.
    </audio>
  );
}

export default Audio;