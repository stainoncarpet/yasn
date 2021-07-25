import { ApolloClient, InMemoryCache } from "@apollo/client";

import getLink from "./apollo-links";

const getApolloClient = (uri: string, token: string) => {
    const client = new ApolloClient({
        uri: uri,
        cache: new InMemoryCache({resultCaching: false}),
    });

    return client;
};

export default getApolloClient;