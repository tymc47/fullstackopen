import { AppBar, Toolbar, IconButton, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = ({ user, logoutBtn }) => {
  const spanStyle = {
    padding: 10,
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
        </Box>

        <>
          <span style={spanStyle}>{user.name} logged in</span>
          <Button variant="outlined" color="inherit" onClick={logoutBtn}>
            logout
          </Button>
        </>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
