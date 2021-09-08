import Table from '../../Table';
import { connect, useDispatch } from 'react-redux';
import { getListFiles } from 'src/redux/selectors';
import { getFiles } from 'src/redux/actions';
import { useEffect } from 'react';

const AllFiles = ({ files }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if(!files) {
      dispatch(getFiles(token));
    }
  });
  
  return (
    <div>
      <Table
        data={files}
        nameOfTable='All Files'
        listField={['fileID', 'userID', 'date', 'fileName', 'size']}
        detail='files'
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
    files: getListFiles(state)
});

export default connect(mapStateToProps)(AllFiles);