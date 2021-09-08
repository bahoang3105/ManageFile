import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CInputFile,
  CRow
} from "@coreui/react";
import { uploadFile } from "src/redux/actions";
import { useState } from "react";
import { connect } from "react-redux";

const Upload = (props) => {
  const [file, setFile] = useState(null);
  const token = localStorage.getItem('token');
  let formData = new FormData();
  formData.append('file', file);
  const upload = () => {
    props.uploadFile(formData, token);
    setFile(null);
  }
  return(
    <CRow>
      <CCol lg={4}></CCol>
      <CCol lg={8}>
        <CCard>
          <CCardHeader>
            Upload File
          </CCardHeader>
          <CCardBody>
            <CInputFile
              onChange={e => setFile(e.target.files[0])}
            />
            <br></br>
            <CButton
              color='success'
              onClick={() => upload(file)}
            >
              Upload
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default connect(
  null,
  { uploadFile }
)(Upload);