import { gql } from '@apollo/client';

// Adjust schemas in here, services/create-user.js, typeDefs.js, User-schema.js
const CREATE_USER = gql`
    mutation CREATE_USER($fullName: String!, $userName: String!, $email: String!, $password: String!, $avatarBase64String: String!) {
        createUser(fullName: $fullName, userName: $userName, email: $email, password: $password, avatarBase64String: $avatarBase64String) {
            id
            authTokens
            avatar
        }
    }
`;

export {CREATE_USER};