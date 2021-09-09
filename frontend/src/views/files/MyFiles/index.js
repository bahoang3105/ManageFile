import Table from '../../Table';
import { connect, useDispatch } from 'react-redux';
import { getListFiles } from 'src/redux/selectors';
import { getFiles } from 'src/redux/actions';
import { useEffect } from 'react';
import Upload from '../../button/Upload';
import { Redirect } from 'react-router';

const MyFiles = ({ files }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if(!files) {
      dispatch(getFiles(token));
    }
  });

  const id = localStorage.getItem('userID');
  let myFiles = [];
  if(files) {
    for(let i = 0; i < files.length; i++) {
      if(files[i].userID.toString() === id) {
        myFiles.push(files[i]);
      }
    }
  }

  const hasLogged = (localStorage.getItem('token') && localStorage.getItem('role') && localStorage.getItem('userID'));
  if(!hasLogged) {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('role');
    return(
      <Redirect to='/login' />
    );
  }

  return (
    <div>
      <Table
        data={myFiles}
        nameOfTable='My Files'
        listField={['fileID', 'date', 'fileName', 'size']}
        detail='my-files'
      />
      <Upload/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  files: getListFiles(state)
});

export default connect(mapStateToProps)(MyFiles);