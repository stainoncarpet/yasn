import { ApolloClient, InMemoryCache } from "@apollo/client";

const getApolloClient = (uri: string) => {
    const client = new ApolloClient({
        uri: uri,
        cache: new InMemoryCache({resultCaching: false})
    });

    return client;
};

export {getApolloClient};