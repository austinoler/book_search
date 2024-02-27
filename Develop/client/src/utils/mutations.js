import { gql } from '@apollo/client';

// Define the LOGIN_USER mutation
export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// Define the ADD_USER mutation
export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// Define the SAVE_BOOK mutation
export const SAVE_BOOK = gql`
  mutation SaveBook($bookId: ID!, $authors: [String], $description: String!, $title: String!, $image: String, $link: String) {
    saveBook(bookId: $bookId, authors: $authors, description: $description, title: $title, image: $image, link: $link) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

// Define the REMOVE_BOOK mutation
export const REMOVE_BOOK = gql`
  mutation RemoveBook($bookId: ID!) {
    deleteBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
