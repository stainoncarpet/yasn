import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import profileSlice from '../../../../../../redux/slices/profile/profile';
import Comment from './Comment/Comment';
import { IStoreState } from '../../../../../../interfaces/state/i-store-state';

const Comments = (props) => {
    const {comments} = props;

    const voteComment = profileSlice.actions['server/vote/comment'];
    const user = useSelector((state: IStoreState) => state.auth);

    const dispatch = useDispatch();

    const handleVote = React.useCallback(async (cid, result) => { dispatch(voteComment({commentId: cid, result: result})); }, []);

    return comments.map((comment) => (
        <Comment 
            comment={comment} 
            key={comment._id} 
            userId={user._id} 
            handleVote={handleVote} 
            dispatch={dispatch}
        />
    ));
};

export default Comments;