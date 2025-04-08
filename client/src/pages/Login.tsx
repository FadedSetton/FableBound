import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import {useNavigate} from 'react-router-dom';

export default function Login() {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const { data } = await login({ variables: { ...formState } });
            localStorage.setItem('id_token', data.login.token);
            navigate('/');
        } catch (err) {
            console.error('Login failed', err);
        }
    };

    return (
        <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>Login failed.</p>}
    </div>
    )
}