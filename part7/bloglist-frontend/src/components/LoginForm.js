import { useState } from 'react';
import { useDispatch } from 'react-redux';

import loginService from '../services/login';
import blogService from '../services/blogs';
import { setLoggedUser } from '../reducers/loggedUserReducer';
import { setNotification } from '../reducers/notificationReducer';
import { Button, TextField } from '@mui/material';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    console.log(event);

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      console.log(user.token);
      blogService.setToken(user.token);

      dispatch(setLoggedUser(user));
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch(
        setNotification({
          type: 'error',
          content: `${exception.response.data.error}`,
        })
      );

      setTimeout(() => {
        dispatch(setNotification(null));
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <TextField
          variant="outlined"
          label="username"
          size="small"
          margin="dense"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <TextField
          variant="outlined"
          type="password"
          label="password"
          size="small"
          margin="dense"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button variant="outlined" id="login-btn" type="submit" margin="dense">
        login
      </Button>
    </form>
  );
};

export default LoginForm;
