import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  let history = useHistory();

  const format = /[!@#$%^&*()+=[\]{};':'\\|,<>/?]+/;

  const checkLogin = async(username, password) => {
    if(!username || !password) {
      setStatus('You need input all fields!');
      return;
    }
    if(format.test(username)) {
      setStatus('Your username is not in the correct format!');
      return;
    }
    setStatus('');
    try {
      const { data } = await axios.post('http://localhost:6000/user/login', { username, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('userID', data.userID);
      if(data.role === 1) {
        return history.push('/admin');
      }
      return history.push('/');
    } catch(error) {
      setStatus(error.response.data.message);
    }
  };

  return (
    <div className='c-app c-default-layout flex-row align-items-center'>
      <CContainer>
        <CRow className='justify-content-center'>
          <CCol md='8'>
            <CCardGroup>
              <CCard className='p-4'>
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className='text-muted'>Sign In to your account</p>
                    <CInputGroup className='mb-3'>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name='cil-user' />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type='text'
                        value={username}
                        placeholder='Username'
                        autoComplete='username'
                        onChange={ (e) => setUsername(e.target.value) }
                      />
                    </CInputGroup>
                    <CInputGroup className='mb-4'>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name='cil-lock-locked' />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type='password'
                        value={password}
                        placeholder='Password'
                        autoComplete='current-password'
                        onChange={ (e) => setPassword(e.target.value) }
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs='6'>
                        <CButton 
                          color='primary'
                          className='px-4'
                          onClick={ () => checkLogin(username, password) }
                        >
                          Login
                        </CButton>
                      </CCol>
                      <p className='auth-status'>{status}</p>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className='text-white bg-primary py-5 d-md-down-none' style={{ width: '44%' }}>
                <CCardBody className='text-center'>
                  <div>
                    <h2>Sign up</h2>
                    <p>Do not have an account?</p>
                    <Link to='/register'>
                      <CButton color='primary' className='mt-3' active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
