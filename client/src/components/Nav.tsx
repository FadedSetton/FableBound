import { Link } from "react-router-dom";

const Nav: React.FC = () => {
  // Check if logged in, conditionally render link buttons Ainsley
    return (
        <nav className="flex-column justify-flex-start min-100-vh" style={{ marginBottom: '1rem' }}>
          <Link to="/">Home</Link> |{' '}
          <Link to="/login">Login</Link> |{' '}
          <Link to="/signup">Signup</Link> |{' '}
          <Link to="/adventure">Adventure</Link>
        </nav>
    );
  };
  
export default Nav;  