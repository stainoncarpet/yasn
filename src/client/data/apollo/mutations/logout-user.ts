import { gql } from '@apollo/client';

const LOGOUT_USER = gql`
    mutation LOGOUT_USER($id: ID, $authToken: String) {
        logoutUser(id: $id, authToken: $authToken)
    }
`;

export {LOGOUT_USER};