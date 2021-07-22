import { gql } from '@apollo/client';

const VOTE_COUNTED = gql`
  subscription VOTE_COUNTED {
    voteCounted{
            id
            likers
            dislikers
    }
  }
`;

export {VOTE_COUNTED};