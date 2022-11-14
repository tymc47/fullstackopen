import { useMutation, useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOGIN } from "../queries";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, result] = useMutation(LOGIN, {
    onError: (err) => console.log(err),
  });
  const client = useApolloClient();

  useEffect(() => {
    if (result.data) {
      setUsername("");
      setPassword("");
      const token = result.data.login.value;
      props.setToken(token);
      props.setPage("books");
      localStorage.setItem("user-token", token);
      client.resetStore();
    }
  }, [result.data]); // eslint-disable-line

  if (!props.show) return null;

  const handleLogin = async (event) => {
    event.preventDefault();

    login({ variables: { username, password } });
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        ></input>
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        ></input>
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
