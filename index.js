const express = require('express');
const {
  graphqlHTTP
} = require('express-graphql');
const schema = require('./schema/schema');
const port = 4000;

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);


app.use('/', (req, res) => {
  res.send("Welcome to lenus-app. Use GraphQL endpoint at /graphql");
});

app.listen(port, () => {
  console.log(`now listening for requests on port ${port}`);
});