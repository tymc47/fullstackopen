import { gql } from "@apollo/client";

const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      published
      id
      author {
        name
      }
    }
  }
`;

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      id
      author {
        name
      }
    }
  }
`;

const ALL_GENRES = gql`
  query {
    allGenres
  }
`;

const CURRENT_USER = gql`
  query {
    me {
      username
      favouriteGenre
    }
  }
`;

const EDIT_BIRTHYEAR = gql`
  mutation editBirthyear($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
      id
    }
  }
`;

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      author {
        name
      }
    }
  }
`;

export {
  CREATE_BOOK,
  ALL_AUTHORS,
  ALL_BOOKS,
  EDIT_BIRTHYEAR,
  LOGIN,
  ALL_GENRES,
  CURRENT_USER,
  BOOK_ADDED,
};
