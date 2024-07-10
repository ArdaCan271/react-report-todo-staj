import React from 'react';
import { Navigate, Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const localEmail = localStorage.getItem('email');
    const localPassword = localStorage.getItem('password');

    axios.post('https://duyu.alter.net.tr/api/getTokenAndModulesOfUser', 
      {email: localEmail, password: localPassword})
      .then((response) => {

      })
      .catch((error) => {
        console.error('Error during the request:', error);
        navigate('/login')
      });
  }, [navigate]);

  return (
    <div id='home-container'>
      <div id='home-view-card'>
        <Link to={'/customers'} className='nav-button'>Customers</Link>
        <Link to={'/products'} className='nav-button'>Products</Link>
      </div>
    </div>
  );
}

export default Home;