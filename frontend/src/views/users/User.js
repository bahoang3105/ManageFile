import { useEffect } from 'react';
import CIcon from '@coreui/icons-react';
import { CRow, CCol } from '@coreui/react';
import { getListUsers, getListFiles } from 'src/redux/selectors';
import { connect, useDispatch } from 'react-redux';
import { getFiles } from 'src/redux/actions';
import TableDetail from '../TableDetail';
import Table from '../Table';
import DeleteUser from './DeleteUser';
import ResetPassword from '../button/ResetPassword';
import UpgradeToAdmin from './UpgradeToAdmin';

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
    <div>
      <CRow>
        <CCol lg={5}>
          <TableDetail
            data={userDetails}
            id={match.params.id}
            nameOfTable='User Detail'
          />
        </CCol>
        <CCol lg={7}>
          <Table
            data={userFiles}
            nameOfTable='User Files'
            listField={['fileID', 'date', 'fileName', 'size']}
            detail='files'
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol lg={2}> 
          <DeleteUser id={match.params.id}/>
        </CCol>
        <CCol lg={2}>
          <ResetPassword id={match.params.id}/>
        </CCol>
        <CCol lg={2}>
          <UpgradeToAdmin id={match.params.id}/>
        </CCol>
      </CRow>
    </div>
  )
}

const mapStateToProps = (state) => ({
  users: getListUsers(state),
  files: getListFiles(state)
});

export default connect(mapStateToProps)(User);
