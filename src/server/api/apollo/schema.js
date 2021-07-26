const { makeExecutableSchema } = require('@graphql-tools/schema');

const { resolvers } = require("./resolvers.js");
const { typeDefs } = require("./typeDefs.js");

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;