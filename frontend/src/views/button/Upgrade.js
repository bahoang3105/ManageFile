import { CButton } from "@coreui/react";

const Upgrade = (props) => {
  return(
    <div>
      <CButton
        color='primary'
        onClick={() => props.upgrade(props.id)}
      >
        {props.nameOfButton}
      </CButton>
    </div>
  );
}

export default Upgrade;