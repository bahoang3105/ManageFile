import { connect } from "react-redux";
import Delete from "src/views/button/Delete";
import { deleteFile } from "src/redux/actions";
import { useHistory } from "react-router";

const DeleteFile = (props) => {
  const token = localStorage.getItem('token');
  const history = useHistory();
  const delFile = (fileID) => {
    props.deleteFile(fileID, token);
    history.goBack();
  };
  
  return (
    <div>
      <Delete id={props.id} del={delFile}/>
    </div>
  );
}

export default connect(
  null,
  { deleteFile }
)(DeleteFile);