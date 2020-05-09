const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

// Schema
const typeDefs = gql`
  type User {
    id: ID 
    login: String
    avatar_url: String
  }

  type Query {
    users: [User]
  }
`;

// Resolvers for fetching data from GQL
const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await axios.get('https://api.github.com/users')
        return users.data.map(({ id, login, avatar_url }) => ({
          id,
          login,
          avatar_url
        }))
      } catch (error) {
        throw error
      }
    }
  }
}

// Creating the Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => console.log(`Server ready at ${url}`))