import { useApolloClient, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import Recommend from "./components/Recommend";
import { CURRENT_USER } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const userQuery = useQuery(CURRENT_USER);
  const user = userQuery.loading ? null : userQuery.data.me;

  const hideWhenLogout = { display: !token ? "none" : "" };
  const hideWhenLogin = { display: !token ? "" : "none" };

  useEffect(() => {
    const token = localStorage.getItem("user-token");
    if (token) {
      setToken(token);
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  console.log(userQuery.loading);

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button style={hideWhenLogout} onClick={() => setPage("add")}>
          add book
        </button>
        <button style={hideWhenLogout} onClick={() => setPage("recommend")}>
          recommend
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

      {token && user ? (
        <Recommend show={page === "recommend"} user={user} />
      ) : null}

      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
