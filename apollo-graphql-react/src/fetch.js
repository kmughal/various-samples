import { InMemoryCache } from "apollo-cache-inmemory"
import { default as ApolloClient } from "apollo-boost"

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  resolvers: {
    Mutation: {
      addPersonToLocalStore: (_root, variables, { cache, getCacheKey }) => {
        const id = getCacheKey({
          __typename: "AddNewPerson",
          id: variables.name,
        })
        cache.writeData({ id, variables })
      },
    },
  },
})

export default client
