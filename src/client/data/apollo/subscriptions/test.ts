import { gql } from '@apollo/client';

const COMMENTS_SUBSCRIPTION = gql`
  subscription ($commentId: String!) {
    commentAdded(commentId: $commentId)
  }
`;

export {COMMENTS_SUBSCRIPTION};