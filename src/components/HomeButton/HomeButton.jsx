import React from 'react';
import './HomeButton.css'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const HomeButton = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/home')
  }

  return (
    <button className='home-button' onClick={handleHomeClick}>
      <AiOutlineArrowLeft/> Ana Sayfa
    </button>
  );
}

export default HomeButton;