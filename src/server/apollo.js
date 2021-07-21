const { ApolloServer } = require('apollo-server-express');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');
const { createServer } = require('http');
const { PubSub } = require("graphql-subscriptions");

const {Comment} = require("./data/mongo/entities/Comment/Comment-model.js");
const {User} = require("./data/mongo/entities/User/User-model.js");
const {Post} = require("./data/mongo/entities/Post/Post-model.js");

const pubsub = new PubSub();

const schema = require("./data/apollo/schema.js");

const _startGraphqlSubscriptionServer = (server, app) => {
    const httpServer = createServer(app);

    const subscriptionServer = SubscriptionServer.create(
        { schema, execute, subscribe },
        { server: httpServer, path: server.graphqlPath}
    );

    const port = process.env.PORT || 3000;

    httpServer.listen(port, () => {
        console.log(`>>>>> SERVER IS LIVE ON ${port}`);
    });

    ['SIGINT', 'SIGTERM'].forEach(signal => process.on(signal, () => subscriptionServer.close()));
};

const startApolloServer = async (app) => {
    const server = new ApolloServer({ 
        schema: schema, 
        context: (hz) => {
            return {
                pubsub: pubsub,
                Comment,
                User,
                Post
            }
        },
        subscriptions: {
            onConnect: (connectionParams, webSocket, context) => {
              console.log('Connected!')
            },
            onDisconnect: (webSocket, context) => {
              console.log('Disconnected!')
            },
        },
        playground: process.env.NODE_ENV === 'development',
        tracing: process.env.NODE_ENV === 'development',
        debug: process.env.NODE_ENV === 'development'
    });

    await server.start();
    
    server.applyMiddleware({ app });

    _startGraphqlSubscriptionServer(server, app);

    return server;
};

module.exports = startApolloServer;