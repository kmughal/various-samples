const { ApolloServer, gql } = require("apollo-server");
const { LinesApi } = require("./datasources/lines");

const books = [
	{
		title: "Harry Potter and the Chamber of Secrets",
		author: {
			name: "J.K. Rowling",
			address: "fake"
		}
	},
	{
		title: "Jurassic Park",
		author: {
			name: "Michael Crichton",
			address: "nill"
		}
	}
];

const authors = [
	{
		name: "Jurassic Park",
		address: "home",
		books: [
			{
				name: "J.K. Rowling",
				address: "fake"
			}
		]
	}
];

const typeDefs = gql`
	type Line {
		id: String
		name: String
		modeName: String
	}

	type Book {
		title: String
		author: Author
	}

	type Author {
		name: String
		address: String
		books: [Author]
	}

	type Query {
		books(name: String): [Book]
		authors: [Author]
		getLine(name: String): Line
	}
`;

const resolvers = {
	Query: {
		books: (parent, args, context, info) => {
			console.log(args);
			console.log(JSON.stringify(context));
			return books.filter(b => b.author.name === args.name);
		},
		authors: () => authors,
		getLine: async (_, { name }, { dataSources }, __) => {
      
      const result = await dataSources.linesApi.getLines(name);
			return result[0];
		}
	}
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources: () => ({
		linesApi: new LinesApi()
	})

	// context: ({ req }) => {
	// 	return {
	// 		authScope: req.headers
	// 	};
	// }
});

server.listen().then(_ => {
	console.log(_.url, " connected");
});
