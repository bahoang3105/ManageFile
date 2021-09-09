import React from 'react';
import CIcon from '@coreui/icons-react'
import { getListFiles } from 'src/redux/selectors';
import { connect } from 'react-redux';
import TableDetail from 'src/views/TableDetail';
import { CButton, CCol, CRow } from '@coreui/react';
import DeleteFile from './DeleteFile';
import axios from 'axios';

const File = ({ files, match }) => {
  const download = async (fileID) => {
    const token = localStorage.getItem('token');
    const url = await axios.get('http://localhost:6000/file/downloadFile', {
      params: {
        fileID
      },
      headers: {
        'x-access-token': token,
      }
    });
    window.location.href = url.data.url;
  }
  const file = files.find( file => file.fileID.toString() === match.params.id)
  const fileDetail = file ? Object.entries(file) : 
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]
    

    return (
    <div>
      <TableDetail
        data={fileDetail}
        id={match.params.id}
        nameOfTable='File Detail'
      />
      <CRow>
        <CCol lg={2}>
          <CButton
            color='success'
            onClick={() => download(match.params.id)}
          >
            Download
          </CButton>
        </CCol>
        <CCol lg={2}> 
          <DeleteFile id={match.params.id}/>
        </CCol>
      </CRow>
    </div>
  );
};

const mapStateToProps = (state) => ({
  files: getListFiles(state)
});

export default connect(mapStateToProps)(File);