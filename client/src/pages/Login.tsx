// src/components/Login.tsx
import React, { useState, FormEvent } from 'react';
import { useMutation, gql } from '@apollo/client';
//import { useNavigate } from 'react-router-dom';

interface LoginData {
  login: {
    token: string;
    user: {
      _id: string;
      username: string;
    };
  };
}

interface LoginVars {
  email: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

const Login: React.FC = () => {
  //const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation<LoginData, LoginVars>(LOGIN_MUTATION, {
    onCompleted: (data) => {
      console.log('Login successful', data);
      localStorage.setItem('id_token', data.login.token);
      //auth.login, #26
     // navigate('/');
     window.location.assign('/');
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login({ variables: { email: formState.email, password: formState.password } });
  };

  return (
    <>
    {/* Add the image at the top */}
    <img 
        src="/assets/headerImage.png" // Ensure this path is correct and the image exists
        alt="Pixel art medieval castle with trees and mountains as background retro style 8-bit game AI generated image" 
        style={{ width: '100%', height: 'auto' }} 
    />
    <div>
      
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formState.email}
          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={formState.password}
          onChange={(e) => setFormState({ ...formState, password: e.target.value })}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
      {error && <p>Error logging in! Please check your credentials.</p>}
    </div>
    </>
  );
};

export default Login;
