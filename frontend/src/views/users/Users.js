import { useEffect } from 'react'
import { getUsers } from 'src/redux/actions';
import { getListUsers } from 'src/redux/selectors';
import { connect, useDispatch } from 'react-redux';
import Table from '../Table';
import CheckLogin from 'src/CheckLogin';

const Users = ({ users }) => {
  CheckLogin();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if(!users) {
      dispatch(getUsers(token));
    }
  });

  return (
    <div>
      <Table
        data={users}
        nameOfTable='All Users'
        listField={['userID', 'username', 'role']}
        detail='users'   
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  users: getListUsers(state)
});

export default connect(mapStateToProps)(Users);
