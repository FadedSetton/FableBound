import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN, CREATE_USER } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';
//need styling for the modal

interface Props {
  onClose: () => void;
}

export default function AuthModal({ onClose }: Props) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ username: '', email: '', password: '' });

  const [login] = useMutation(LOGIN);
  const [createUser] = useMutation(CREATE_USER);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, formType: 'login' | 'signup') => {
    const { name, value } = e.target;
    formType === 'login'
      ? setLoginForm({ ...loginForm, [name]: value })
      : setSignupForm({ ...signupForm, [name]: value });
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: loginForm });
      localStorage.setItem('id_token', data.login.token);
      onClose();
      navigate('/');
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await createUser({ variables: signupForm });
      localStorage.setItem('id_token', data.createUser.token);
      onClose();
      navigate('/');
    } catch (err) {
      console.error('Signup failed', err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="tab-header">
          <button
            className={activeTab === 'login' ? 'active' : ''}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={activeTab === 'signup' ? 'active' : ''}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        {activeTab === 'login' ? (
          <form onSubmit={handleLoginSubmit}>
            <input name="email" type="email" placeholder="Email" onChange={(e) => handleInputChange(e, 'login')} />
            <input name="password" type="password" placeholder="Password" onChange={(e) => handleInputChange(e, 'login')} />
            <button type="submit">Login</button>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit}>
            <input name="username" placeholder="Username" onChange={(e) => handleInputChange(e, 'signup')} />
            <input name="email" type="email" placeholder="Email" onChange={(e) => handleInputChange(e, 'signup')} />
            <input name="password" type="password" placeholder="Password" onChange={(e) => handleInputChange(e, 'signup')} />
            <button type="submit">Sign Up</button>
          </form>
        )}
      </div>
    </div>
  );
}


// logic to add it to a navbar or header or wherever you want the modal to be triggered
// import { useState } from 'react';
// import AuthModal from './components/AuthModal';
// import { loggedIn } from './utils/auth';

// export default function Nav() {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <nav>
//       {!loggedIn() && (
//         <>
//           <button onClick={() => setShowModal(true)}>Login / Sign Up</button>
//           {showModal && <AuthModal onClose={() => setShowModal(false)} />}
//         </>
//       )}
//     </nav>
//   );
// }