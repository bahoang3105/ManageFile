import { CButton } from "@coreui/react";

const Download = () => {
  // const token = localStorage.getItem('token');
  const download = () => {
  }
  return(
    <CButton
      color='success'
      onClick={() => download}
    >
      Download
    </CButton>
  );
}

export default Download;