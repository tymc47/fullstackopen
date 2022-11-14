import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS, ALL_GENRES } from "../queries";

const Books = (props) => {
  const [filter, setFilter] = useState(null);
  const queryResult = useQuery(ALL_BOOKS, {
    variables: { genre: null },
  });
  const allGenres = useQuery(ALL_GENRES);

  if (!props.show) {
    return null;
  }

  if (queryResult.loading || allGenres.loading) return <div>loading...</div>;

  const books = queryResult.data.allBooks;
  const genres = allGenres.data.allGenres;

  console.log(books);

  return (
    <div>
      <h2>books</h2>
      {filter ? (
        <div>
          in genre <strong>{filter}</strong>
        </div>
      ) : null}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => {
            setFilter(genre);
            queryResult.refetch({ genre });
          }}
        >
          {genre}
        </button>
      ))}
      <button
        onClick={() => {
          setFilter(null);
          queryResult.refetch({ genre: null });
        }}
      >
        all genres
      </button>
    </div>
  );
};

export default Books;
