import { useHistory } from "react-router";

const CheckLogin = () => {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const userID = localStorage.getItem('userID');
  const role = localStorage.getItem('role')
  if(token === null || userID === null || role === null) {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('role');
    history.push('/login');
  } 
}

export default CheckLogin;