const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

// Define schema
const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    hello: String
    user(id: ID!): User
  }
`);

// Dummy data
const users = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" }
];

// Define resolvers
const root = {
  hello: () => "Hello from GraphQL on Express 🚀",
  user: ({ id }) => users.find(u => u.id === id),
};

// Mount GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // interactive UI at /graphql
  })
);

app.get('/',(req,res)=>{
    res.json("Hello , Server is running")
})

app.listen(4000, () => {
  console.log("✅ GraphQL API running at http://localhost:4000/graphql");
});
