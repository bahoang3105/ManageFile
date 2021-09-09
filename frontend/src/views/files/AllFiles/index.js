import Table from '../../Table';
import { connect, useDispatch } from 'react-redux';
import { getListFiles } from 'src/redux/selectors';
import { getFiles } from 'src/redux/actions';
import { useEffect } from 'react';

const AllFiles = ({ files }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  useEffect(() => {
    if(!files) {
      dispatch(getFiles(token, role));
    }
  });
  
  return (
    <div>
      <Table
        data={files}
        nameOfTable='All Files'
        listField={['fileID', 'userID', 'date', 'fileName', 'size']}
        detail='all-files'
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
    files: getListFiles(state)
});

export default connect(mapStateToProps)(AllFiles);