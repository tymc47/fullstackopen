import { useState } from 'react';
import { useDispatch } from 'react-redux';

import loginService from '../services/login';
import blogService from '../services/blogs';
import { setLoggedUser } from '../reducers/loggedUserReducer';
import { setNotification } from '../reducers/notificationReducer';

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
          type: 'fail',
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
        username
        <input
          type="text"
          id="username-input"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          id="password-input"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-btn" type="submit">
        login
      </button>
    </form>
  );
};

export default LoginForm;
