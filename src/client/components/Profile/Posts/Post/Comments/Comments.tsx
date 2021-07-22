import React from 'react';
import Comment from './Comment/Comment';

const Comments = (props) => {
    const {comments} = props;

    return comments.map((comment) => (
        <Comment comment={comment} key={comment.id} />
    ));
};

export default Comments;