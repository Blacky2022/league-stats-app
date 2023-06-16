import React from 'react';
import { useNavigate } from 'react-router-dom';
import './button.css' 
export function LogoutButton() {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await fetch('http://localhost:3001/user/logout', {
				method: 'POST',
				credentials: 'include',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
				}});
      navigate('/');
    } catch (error) {
      console.error('Błąd podczas wylogowywania', error);
    }
  };

  return (
    <button className ='logout-button'  onClick={handleClick}>
      Logout
    </button>
  );
}


