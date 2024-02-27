const { gql } = require('apollo-server-express');
const userTypeDefs = require('./user');
const bookTypeDefs = require('./book');

const rootTypeDefs = gql`
  type Query {
    # This is a placeholder query
    _empty: String
  }

  type Mutation {
    # This is a placeholder mutation
    _empty: String
  }
`;

const typeDefs = [rootTypeDefs, userTypeDefs, bookTypeDefs];

module.exports = typeDefs;
