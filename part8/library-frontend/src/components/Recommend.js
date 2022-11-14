import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Recommend = (props) => {
  const genre = props.user.favouriteGenre;
  const booksQuery = useQuery(ALL_BOOKS, {
    variables: { genre: genre },
  });

  if (!props.show) return null;

  if (booksQuery.loading) return <div>loading...</div>;

  const books = booksQuery.data.allBooks;

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favourite genre <strong>{genre}</strong>
      </div>
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
    </div>
  );
};

export default Recommend;
