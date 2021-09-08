import { connect } from "react-redux";
import { upgradeToAdmin } from "src/redux/actions";
import Upgrade from "../button/Upgrade";

const UpgradeToAdmin = (props) => {
  const token = localStorage.getItem('token');
  const upgrade = (userID) => {
    props.upgradeToAdmin(userID, token);
  };

  return(
    <div>
      <Upgrade id={props.id} upgrade={upgrade} nameOfButton='Upgrade To Admin'/>
    </div>
  );
}

export default connect(
  null,
  { upgradeToAdmin }
)(UpgradeToAdmin);