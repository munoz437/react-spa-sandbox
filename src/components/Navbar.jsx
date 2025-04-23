import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/users">Users</NavLink>
      <NavLink to="/profile">Profile</NavLink>
    </nav>
  );
};

export default Navbar;
