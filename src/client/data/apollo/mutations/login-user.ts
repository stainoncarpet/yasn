import { gql } from '@apollo/client';

// Adjust schemas in here, services/create-user.js, typeDefs.js, User-schema.js
const LOGIN_USER = gql`
    mutation LOGIN_USER($email: String, $password: String) {
        loginUser(email: $email, password: $password){
            userId
            authToken
            avatar
        }
    }
`;

export {LOGIN_USER};