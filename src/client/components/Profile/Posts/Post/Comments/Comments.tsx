import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import profileSlice from '../../../../../data/redux/slices/profile/profile';
import Comment from './Comment/Comment';

const Comments = (props) => {
    const {comments} = props;

    const voteComment = profileSlice.actions['server/vote/comment'];
    const user = useSelector((state: any) => state.auth);

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