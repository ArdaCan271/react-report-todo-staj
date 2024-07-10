import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const localEmail = localStorage.getItem('email');
    const localPassword = localStorage.getItem('password');

    console.log(localEmail);
    console.log(localPassword);

    axios.post('https://duyu.alter.net.tr/api/getTokenAndModulesOfUser', 
      {email: localEmail, password: localPassword})
      .then((response) => {
        navigate('/home')
      })
      .catch((error) => {
        console.error('Error during the request:', error);
        navigate('/login')
      });
  }, [navigate]);

  return <div>Loading...</div>; // Simple loading state
};

export default Root;
