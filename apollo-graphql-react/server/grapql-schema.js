const { gql } = require("apollo-server")

const typeDefs = gql`
  type Person {
    name: String
    age: Int
  }

  type Query {
    people: [Person]
  }

  type Mutation {
    createPerson(name: String, age: Int): Person
  }
`

exports.typeDefs = typeDefs
const { getDefaultCollection } = require("./mongodb")

const mutation = {
  Mutation: {
    createPerson: async (root, args) => {
      const { name, age } = args
      const collection = await getDefaultCollection()
      const record = { name, age }
      collection.insertOne(record)
      return record
    },
  },
}
const query = {
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

const resolvers = Object.assign({}, mutation, query)
console.log(resolvers)
exports.resolvers = resolvers
