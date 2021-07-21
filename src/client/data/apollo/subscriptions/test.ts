import { gql } from '@apollo/client';

const COMMENTS_SUBSCRIPTION = gql`
  subscription ($commentId: String!) {
    commentAdded(commentId: $commentId) {
      content
    }
  }
`;

export {COMMENTS_SUBSCRIPTION};