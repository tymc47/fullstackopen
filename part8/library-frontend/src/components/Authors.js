import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from "../queries";

const Authors = (props) => {
  const [author, setAuthor] = useState("");
  const [born, setBorn] = useState("");
  const [editBirthYear] = useMutation(EDIT_BIRTHYEAR);
  const queryResult = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }

  if (queryResult.loading) return <div>loading...</div>;

  const authors = queryResult.data.allAuthors;

  const changeBirthyear = (event) => {
    event.preventDefault();
    console.log("...change birth year");

    editBirthYear({ variables: { name: author, born: parseInt(born) } });

    setAuthor("");
    setBorn("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form style={props.hideSetBirth} onSubmit={changeBirthyear}>
        <h3>set birthyear</h3>
        <div>
          name
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          ></input>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
