import { gql } from '@apollo/client';

const VOTE_POST = gql`
    mutation VOTE_POST($authToken: String!, $postId: ID!, $voteResult: Int!) {
        votePost(authToken: $authToken, postId: $postId, voteResult: $voteResult){
            id
            likers
            dislikers
        }
    }
`;

const VOTE_COMMENT = gql`
    mutation VOTE_COMMENT($authToken: String!, $commentId: ID!, $voteResult: Int!) {
        voteComment(authToken: $authToken, commentId: $commentId, voteResult: $voteResult){
            id
            likers 
            dislikers
        }
    }
`;

export {VOTE_POST, VOTE_COMMENT};