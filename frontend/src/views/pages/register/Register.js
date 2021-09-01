import React, { useState } from 'react';
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [status, setStatus] = useState('');

  const format = /[!@#$%^&*()+=[\]{};':"\\|,<>/?]+/;

  const check = async(username, password, repeatPassword) => {
    if(!username || !password || !repeatPassword) {
      setStatus("You need input all fields!");
      return;
    }
    if(format.test(username)) {
      setStatus("Your username do not contain special symbols!");
      return;
    }
    if(username.length < 8) {
      setStatus("Your username is too short!");
      return;
    }
    if(password.length < 8) {
      setStatus("Your password is too short!");
      return;
    }
    if(password !== repeatPassword) {
      setStatus("Password and repeat password need to be the same!");
      return;
    }
    setStatus("");
    console.log("dsdsd");
    const isSuccess = await axios.post("http://localhost:6000/user/signup", { username, password });
    console.log("huhuhu")
    console.log(isSuccess)
    if(!isSuccess.data.success) {
      setStatus(isSuccess.data.message);
      return;
    }
    alert('Success Register!');
    window.location.href = 'login';
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput 
                      type="text" 
                      value={username}
                      placeholder="Username" 
                      autoComplete="username" 
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput 
                      type="password" 
                      value={password} 
                      placeholder="Password" 
                      autoComplete="new-password"
                      onChange={(e) => setPassword(e.target.value)}  
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput 
                      type="password" 
                      value={repeatPassword}
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      onChange={(e) => setRepeatPassword(e.target.value)}  
                    />
                  </CInputGroup>
                  <CButton color="success" block onClick={() => check(username, password, repeatPassword)}>Create Account</CButton>
                  <p className="auth-status">{status}</p>
                  <p className='auth-comment'>
                    <p>Do you have an account?&nbsp;</p> 
                    <Link to='login'>Login</Link>
                  </p>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
