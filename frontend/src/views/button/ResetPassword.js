import { CButton } from "@coreui/react";
import { connect } from "react-redux";
import { resetPassUser } from "src/redux/actions";

const ResetPassword = (props) => {
  const token = localStorage.getItem('token');
  const resetPass = (userID) => {
    props.resetPassUser(userID, token);
    alert('Reset password successfully!');
  }
  return(
    <div>
      <CButton
        color='info'
        onClick={() => resetPass(props.id)}
      >
        Reset Password
      </CButton>
    </div>
  );
}

export default connect(
  null,
  { resetPassUser }
)(ResetPassword);