import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

const Nav: React.FC = () => {
  // Check if logged in, conditionally render link buttons - Ainsley

  
  // const [token, setToken] = useState(() => {
  //   const storedData = localStorage.getItem('id_token');
  //   return storedData ? storedData : null;
  // });
  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     const storedData = localStorage.getItem('id_token');
  //     setToken(storedData ? storedData : null);
  //   };

  //   window.addEventListener('storage', handleStorageChange);

  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, []);
const token = localStorage.getItem('id_token');

    return (
        <nav className="flex-column justify-flex-start min-100-vh" style={{ marginBottom: '1rem' }}>
          | <Link to="/">Home</Link> |{' '}
          {!token && <Link to="/login">Login</Link>} |{' '}
          {!token && <Link to="/signup">Signup</Link>} |{' '}
          <Link to="/adventure">Adventure</Link>
          {token && logOutButton()} |{' '}
        </nav>
    );
  };
  
export default Nav;  

function logOutButton(){
  // Log out button
  const handleLogout = () => {
    localStorage.removeItem('id_token');
    window.location.reload();
  };

  return (
    <nav  className="flex-column justify-flex-start min-100-vh" style={{ marginBottom: '1rem' }} onClick={handleLogout}>
      Logout
    </nav>
  );

}