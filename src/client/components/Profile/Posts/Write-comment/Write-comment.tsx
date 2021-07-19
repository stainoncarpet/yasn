import React from 'react';

const WriteComment = (props) => {
    const {commentContent, setCommentContent, postComment} = props;
    return (
        <article className="media">
            <div className="media-content">
                <div className="field">
                <p className="control">
                    <textarea className="textarea" placeholder="Add a comment..." value={commentContent} onChange={setCommentContent}></textarea>
                </p>
                </div>
                <div className="field">
                <p className="control">
                    <button className="button" onClick={postComment}>Post comment</button>
                </p>
                </div>
            </div>
            </article>
    );
};

export default WriteComment;