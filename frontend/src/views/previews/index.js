import Audio from "./Audio";
import Other from "./Other";
import Photo from "./Photo";
import Video from "./Video";

const Preview = ({ type, fileKey }) => {
  const href = 'https://my-file-manager.s3.ap-southeast-1.amazonaws.com/' + fileKey;
  switch(type) {
    case 'image': {
      return (
        <div>
          <Photo href={href}/>
        </div>
      );
    }
    case 'video': {
      return (
        <div>
          <Video href={href}/>
        </div>
      );
    }
    case 'audio': {
      return (
        <div>
          <Audio href={href}/>
        </div>
      );
    }
    default: {
      return (
        <div>
          <Other type={type}/>
        </div>
      );
    }
  }
}

export default Preview;