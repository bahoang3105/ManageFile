import { CButton } from "@coreui/react";

const Delete = (props) => {
  return(
    <div>
      <CButton
        color='danger'
        onClick={() => props.del(props.id)}
      >
        &nbsp;&nbsp;Delete&nbsp;&nbsp;
      </CButton>
    </div>
  );
}

export default Delete;