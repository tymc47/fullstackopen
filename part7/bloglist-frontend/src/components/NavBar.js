import { Link } from 'react-router-dom';

const NavBar = ({ user, logoutBtn }) => {
  const padding = {
    padding: 5,
  };
  return (
    <div>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user ? (
        <>
          <em>{user.name} logged in</em>
          <button onClick={logoutBtn}>logout</button>
        </>
      ) : (
        <Link style={padding} to="/login">
          login
        </Link>
      )}
    </div>
  );
};

export default NavBar;
