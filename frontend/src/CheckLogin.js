import { useHistory } from "react-router";

const CheckLogin = () => {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const userID = localStorage.getItem('userID');
  if(!token || !userID) {
    history.push('/login');
  } 
}

export default CheckLogin;