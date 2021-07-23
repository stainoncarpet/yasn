import { gql } from '@apollo/client';

// Getting comments via post
const GET_COMMENTS = gql`
    query GET_COMMENTS($postId: ID!) {
        post(postId: $postId) {
            comments {
                id
                dateOfPublication
                content
				author {
                    id
                    fullName
                    userName
                    avatar
                  }
                replyTo
                likers
                dislikers
            }
        }
    }
`;

export {GET_COMMENTS};