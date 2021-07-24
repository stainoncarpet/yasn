import React from 'react';
import Comment from './Comment/Comment';
import { useMutation, useSubscription } from '@apollo/client';

import { VOTE_COMMENT } from '../../../../../data/apollo/mutations/vote';
import { ON_COMMENT_VOTE_COUNTED } from '../../../../../data/apollo/subscriptions/vote-counted';

import UserContext from '../../../../../data/context/User-context';

const Comments = (props) => {
    const {comments} = props;
    
    const {state} = React.useContext<any>(UserContext);
    const [vote] = useMutation(VOTE_COMMENT);

    // Despite the fact that the data it brings isn't used anywhere, the mere fact of subscription ensures real-time updates
    useSubscription(ON_COMMENT_VOTE_COUNTED); 

    const handleVote = React.useCallback(async (cid, result) => {await vote({variables: {authToken: state.user.token, commentId: cid, voteResult: result}})}, []);

    return comments.map((comment) => (
        <Comment comment={comment} likers={comment.likers} dislikers={comment.dislikers} key={comment._id} userId={state.user._id} handleVote={handleVote} />
    ));
};

export default Comments;