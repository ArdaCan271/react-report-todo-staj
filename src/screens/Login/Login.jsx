import React from 'react';
import '../Login/Login.css'
import { useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const localEmail = localStorage.getItem('email');
    const localPassword = localStorage.getItem('password');

    axios.post('https://duyu.alter.net.tr/api/getTokenAndModulesOfUser',
      { email: localEmail, password: localPassword })
      .then((response) => {
        navigate('/home')
      })
      .catch((error) => {
        console.error('Error during the request:', error);
        navigate('/login')
      });
  }, [navigate]);

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://duyu.alter.net.tr/api/getTokenAndModulesOfUser', {
      email: emailValue,
      password: passwordValue
    })
    .then(res => {
      localStorage.setItem("email", emailValue);
      localStorage.setItem("password", passwordValue);
      localStorage.setItem("temp_token", res.data.token);
      navigate('/home');
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <div id='login-container'>
      <div id='login-view'>
        <div id='login-text'>Log In</div>
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className='login-input-container'>
            <div className='login-input-title'>Email address</div>
            <input 
              type='email'
              placeholder='Enter email' 
              value={emailValue} 
              onChange={(e) => setEmailValue(e.target.value)} 
              className='login-input'
              required
            />
          </div>
          <div className='login-input-container'>
            <div className='login-input-title'>Password</div>
            <input 
              type='password'
              placeholder='Enter password' 
              value={passwordValue} 
              onChange={(e) => setPasswordValue(e.target.value)} 
              className='login-input'
              required
            />
          </div>
          <button type='submit' id='login-button'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;