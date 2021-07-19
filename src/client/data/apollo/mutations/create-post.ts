import { gql } from '@apollo/client';

const CREATE_POST = gql`
    mutation CREATE_POST($authToken: String!, $postTitle: String!, $postContent: String!) {
        createPost(authToken: $authToken, postTitle: $postTitle, postContent: $postContent) {
            id
            title
            content
        }
    }
`;

export {CREATE_POST};