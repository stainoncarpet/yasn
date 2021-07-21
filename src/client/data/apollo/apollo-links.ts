import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const getHttpLink = () => {
  return new HttpLink({
    uri: 'http://localhost:3000/graphql'
  })
};

const getWsLink = (token) => {
  return new WebSocketLink({
    uri: 'ws://localhost:3000/graphql',
    options: {
      reconnect: true,
      connectionParams: {
        authToken: token,
      },
    }
  })
};

const getLink = (token) => split(({ query }) => { 
  const definition = getMainDefinition(query); 

  return (definition.kind === 'OperationDefinition' && definition.operation === 'subscription');
}, getWsLink(token), getHttpLink());;

export default getLink;