const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String!
    title: String!
    image: String
    link: String
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    me: User
    getUser(userId: ID!): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookId: ID!, authors: [String], description: String!, title: String!, image: String, link: String): User
    deleteBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
