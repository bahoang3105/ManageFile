import { connect } from "react-redux";
import { useHistory } from "react-router";
import { deleteUser } from "src/redux/actions";
import Delete from "src/views/button/Delete";

const DeleteUser = (props) => {
  const token = localStorage.getItem('token');
  const history = useHistory();
  const delUser = (userID) => {
    props.deleteUser(userID, token);
    history.goBack();
  };

  return(
    <div>
      <Delete id={props.id} del={delUser} />
    </div>
  );
}

export default connect(
  null,
  { deleteUser }
)(DeleteUser);