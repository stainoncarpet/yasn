import React from 'react';
import Comment from './Comment/Comment';
import { useDispatch } from 'react-redux';

import UserContext from '../../../../../data/context/User-context';
import postsSlice from '../../../../../data/redux/slices/posts/posts';

const Comments = (props) => {
    const {comments} = props;

    const voteComment = postsSlice.actions['server/vote/comment'];

    const dispatch = useDispatch();
    
    const {state} = React.useContext<any>(UserContext);

    const handleVote = React.useCallback(async (cid, result) => {
        console.log(state.user.token, cid);
        //@ts-ignore
        dispatch(voteComment({token: state.user.token, commentId: cid, result: result}));
        
        
    }, []);

    return comments.map((comment) => (
        <Comment 
            comment={comment} 
            key={comment._id} 
            userId={state.user.id} 
            handleVote={handleVote} 
        />
    ));
};

export default Comments;