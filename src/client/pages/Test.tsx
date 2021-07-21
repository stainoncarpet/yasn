import React from 'react';

import { useSubscription } from '@apollo/client';
import { COMMENTS_SUBSCRIPTION } from "../data/apollo/subscriptions/test";

const Test = () => {
  const { data, loading } = useSubscription(COMMENTS_SUBSCRIPTION, {variables: {commentId: "-0"}});
  return <h4>New comment: {loading ? "loading" : data && data.commentAdded}</h4>;
};

export default Test;
