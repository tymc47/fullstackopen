import { useApolloClient } from "@apollo/client";
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const hideWhenLogout = { display: !token ? "none" : "" };
  const hideWhenLogin = { display: !token ? "" : "none" };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button style={hideWhenLogout} onClick={() => setPage("add")}>
          add book
        </button>
        <button style={hideWhenLogin} onClick={() => setPage("login")}>
          login
        </button>
        <button style={hideWhenLogout} onClick={logout}>
          logout
        </button>
      </div>

      <Authors show={page === "authors"} hideSetBirth={hideWhenLogout} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
