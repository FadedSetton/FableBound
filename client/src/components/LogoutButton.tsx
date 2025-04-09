import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';

export default function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login'); // Redirect to the homepage or login page after logout
    };

    return(
        <button onClick={handleLogout} className="logout-button">
            Logout
        </button>
    )
}

// logic for the button to be used in a navbar or header
// import LogoutButton from './components/LogoutButton';

// ...

// {loggedIn() && <LogoutButton />}