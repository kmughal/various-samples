const { gql } = require("apollo-server")

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Person {
    name: String
    age: Int
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    people: [Person]
  }
`


exports.typeDefs = typeDefs
const { getDefaultCollection } = require("./mongodb")
const resolvers = {
  Query: {
    people: async () => {
      const collection = await getDefaultCollection()
      let result = await collection.find({}).toArray()
      result = result
        .map((x) => {
          if (x.name && x.age) return { name: x.name, age: parseInt(x.age, 10) }
          return null
        })
        .filter(Boolean)

      console.log(result)
      return result
    },
  },
}
// const resolvers = {
//   Query: {
//     books: () => books,
//   },
// }
exports.resolvers = resolvers
