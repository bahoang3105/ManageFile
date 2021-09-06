import { useEffect } from 'react';
import CIcon from '@coreui/icons-react';
import { CRow, CCol } from '@coreui/react';
import { getListUsers, getListFiles } from 'src/redux/selectors';
import { connect, useDispatch } from 'react-redux';
import { getFiles } from 'src/redux/actions';
import TableDetail from '../TableDetail';
import Table from '../Table';

const User = ({ users, files, match }) => {
  const id = match.params.id
  const user = users.find( user => user.userID.toString() === id)
  const userDetails = user ? Object.entries(user) : 
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]
  
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    useEffect(() => {
      if(!files) {
        dispatch(getFiles(token));
      }
    });

    let userFiles = [];
    if(files) {
      for(let i = 0; i < files.length; i++) {
        if(files[i].userID.toString() === id) {
          userFiles.push(files[i]);
        }
      }
    }

  return (
    <CRow>
      <CCol lg={5}>
        <TableDetail
          data={userDetails}
          id={match.params.id}
          nameOfTable='User ID'
        />
      </CCol>
      <CCol lg={7}>
        <Table
          data={userFiles}
          nameOfTable='User Files'
          listField={['fileID', 'userID', 'date', 'fileName', 'size']}
          detail='files/detail'
        />
      </CCol>
    </CRow>
  )
}

const mapStateToProps = (state) => ({
  users: getListUsers(state),
  files: getListFiles(state)
});

export default connect(mapStateToProps)(User);
