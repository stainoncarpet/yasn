import { gql } from '@apollo/client';

const CREATE_COMMENT = gql`
    mutation CREATE_COMMENT($authToken: String!, $content: String!, $postId: ID!, $replyTo: ID) {
        createComment(authToken: $authToken, content: $content, postId: $postId, replyTo: $replyTo) {
            id
            dateOfPublication
            content
            author {
                id
                fullName
                userName
                avatar
            }
            post
            replyTo
            likers
            dislikers
        }
    }
`;

export {CREATE_COMMENT};