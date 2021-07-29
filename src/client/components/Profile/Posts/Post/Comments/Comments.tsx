import React from 'react';
import Comment from './Comment/Comment';
import { useDispatch, useSelector } from 'react-redux';

import postsSlice from '../../../../../data/redux/slices/posts/posts';

const Comments = (props) => {
    const {comments} = props;

    const voteComment = postsSlice.actions['server/vote/comment'];
    const user = useSelector((state: any) => state.user);

    const dispatch = useDispatch();

    const handleVote = React.useCallback(async (cid, result) => {
        //@ts-ignore
        dispatch(voteComment({token: user.token, commentId: cid, result: result}));
    }, []);

    return comments.map((comment) => (
        <Comment 
            comment={comment} 
            key={comment._id} 
            userId={user._id} 
            userToken={user.token}
            handleVote={handleVote} 
            dispatch={dispatch}
        />
    ));
};

export default Comments;