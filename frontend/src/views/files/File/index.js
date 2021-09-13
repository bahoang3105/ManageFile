import React from 'react';
import CIcon from '@coreui/icons-react'
import { getListFiles } from 'src/redux/selectors';
import { connect } from 'react-redux';
import TableDetail from 'src/views/TableDetail';
import { CButton, CCardHeader, CCol, CRow } from '@coreui/react';
import DeleteFile from './DeleteFile';
import axios from 'axios';
import { baseURL } from 'src/config';
import Preview from 'src/views/previews';

const File = ({ files, match }) => {
  const download = async (fileID) => {
    const token = localStorage.getItem('token');
    const url = await axios.get(baseURL + 'file/downloadFile', {
      params: {
        fileID
      },
      headers: {
        'x-access-token': token,
      }
    });
    window.location.href = url.data.url;
  }
  const file = files.find( file => file.fileID.toString() === match.params.id);
  const fileDetail = file ? Object.entries(file) : 
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]];
  
  const imageType = ['png', 'jpg', 'jpeg'];
  const videoType = ['mp4'];
  const audioType = ['mp3'];
  let type;
  if(imageType.includes(file.fileType)) type = 'image';
  else if(videoType.includes(file.fileType)) type = 'video';
  else if(audioType.includes(file.fileType)) type = 'audio';
  else type = file.fileType;

  return (
    <div>
      <TableDetail
        data={fileDetail}
        id={match.params.id}
        nameOfTable='File Detail'
      />
      <CCardHeader>
        Preview<br/><br/>
        <Preview fileKey={file.fileKey} type={type}/>
      </CCardHeader>
      <br/>
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