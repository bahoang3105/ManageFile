import React from 'react';
import CIcon from '@coreui/icons-react'
import { getListFiles } from 'src/redux/selectors';
import { connect } from 'react-redux';
import TableDetail from 'src/views/TableDetail';

const File = ({ files, match }) => {
  const file = files.find( file => file.fileID.toString() === match.params.id)
  const fileDetail = file ? Object.entries(file) : 
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]
    return (
    <div>
      <TableDetail
        data={fileDetail}
        id={match.params.id}
        nameOfTable='File ID'
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  files: getListFiles(state)
});

export default connect(mapStateToProps)(File);