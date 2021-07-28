import React from 'react';

const WriteComment = (props) => {
    const {commentContent, setCommentContent, postComment} = props;

    const commentsBoxRef = React.useRef(null);

    React.useEffect(() => {
        if(commentsBoxRef && commentsBoxRef.current) {
            //@ts-ignore
            commentsBoxRef.current.focus();
        }
    }, []);

    return (
        <article className="media">
            <div className="media-content">
                <div className="field">
                <p className="control">
                    <textarea 
                    ref={commentsBoxRef} 
                    className="textarea" 
                    placeholder="Add a comment..." 
                    value={commentContent} 
                    onChange={setCommentContent} />
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