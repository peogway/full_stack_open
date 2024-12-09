import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;
export const ALL_BOOKS = gql`
query($genre: String) {
  allBooks(genre: $genre) {
    title
    author {
      born
      name
      bookCount
    }
    published
    genres
  }
}
`;

export const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(title: $title, published: $published,author: $author, genres: $genres) {
        title
        published
        author{
          name
          born
          bookCount
        }
        genres
    }
  }
`;

export const SET_BIRTHYEAR = gql`
  mutation setBirthyear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`;

export const FAV_GENRE = gql`
query{
  favoriteGenre {
    genre
  }
}`;

export const SET_FAVORITE_GENRE = gql`
  mutation setFavorite($genre: String!) {
    setFavorite(genre: $genre) {
      genre
    }
  }
`;
