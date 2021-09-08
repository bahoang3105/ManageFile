import CIcon from "@coreui/icons-react";
import { CDropdownItem } from "@coreui/react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { logout } from "src/redux/actions";

const Logout = (props) => {
  const history = useHistory();
  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    props.logout();
    history.push('/login')
  }
  return (
    <CDropdownItem onClick={() => onLogout()}>
      <CIcon name="cil-lock-locked" className="mfe-2" />
      Lock Account
    </CDropdownItem>
  );
}

export default connect(
  null,
  { logout }
)(Logout);