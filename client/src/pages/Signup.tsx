import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [createUser, { error }] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await createUser({ variables: { ...formState } });
      localStorage.setItem('id_token', data.createUser.token);
      navigate('/'); // ✅ Redirect to homepage or dashboard
    } catch (err) {
      console.error('Signup failed', err);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" type="text" placeholder="Username" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: 'red' }}>Signup failed.</p>}
    </div>
  );
}
