// src/components/Signup.tsx
import React, { useState, FormEvent } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

interface SignupData {
  createUser: {
    token: string;
    user: {
      _id: string;
      username: string;
    };
  };
}

interface SignupVars {
  username: string;
  email: string;
  password: string;
}

const SIGNUP_MUTATION = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [createUser, { error }] = useMutation<SignupData, SignupVars>(SIGNUP_MUTATION, {
    onCompleted: (data) => {
      localStorage.setItem('id_token', data.createUser.token);
      navigate('/');
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createUser({
      variables: {
        username: formState.username,
        email: formState.email,
        password: formState.password,
      },
    });
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={formState.username}
          onChange={(e) => setFormState({ ...formState, username: e.target.value })}
          required
        />
        <br />
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
        <button type="submit">Signup</button>
      </form>
      {error && <p>Error signing up!</p>}
    </div>
  );
};

export default Signup;
