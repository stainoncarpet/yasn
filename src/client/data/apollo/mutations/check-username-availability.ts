import { gql } from '@apollo/client';

const CHECK_USERNAME_AVAILABILITY = gql`
    mutation CHECK_USERNAME_AVAILABILITY($userName: String) {
        checkUserNameAvailability(userName: $userName)
    }
`;

export {CHECK_USERNAME_AVAILABILITY};