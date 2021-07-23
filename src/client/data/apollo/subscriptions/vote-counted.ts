import { gql } from '@apollo/client';

const ON_COMMENT_VOTE_COUNTED = gql`
  subscription ON_COMMENT_VOTE_COUNTED {
    onCommentVoteCounted{
            id
            likers
            dislikers
    }
  }
`;

const ON_POST_VOTE_COUNTED = gql`
  subscription ON_POST_VOTE_COUNTED {
    onPostVoteCounted{
            id
            likers
            dislikers 
    }
  }
`;

export {ON_COMMENT_VOTE_COUNTED, ON_POST_VOTE_COUNTED};