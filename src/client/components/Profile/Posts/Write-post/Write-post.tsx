import React from 'react';

const WritePost = (props) => {
    const {postTitle, postContent, setPostTitle, setPostContent, handlePostSubmit, isCreateNewPostShown, toggle, showNewPostButton} = props;

    return (
        <React.Fragment>
        {showNewPostButton && <button className="button is-link is-light" onClick={toggle}>{isCreateNewPostShown ? "- Hide" : "+ New Post"}</button>}
        { isCreateNewPostShown && <div className="new-post-form my-4">
            <h3 className="subtitle is-3">Create New Post</h3>
            <article className="media">
                <div className="media-content">
                    <div className="field">
                        <input className="input is-normal" type="text" placeholder="Post title" value={postTitle} onChange={setPostTitle} />
                    </div>
                    <div className="field">
                        <p className="control">
                            <textarea className="textarea" placeholder="Post content" value={postContent} onChange={setPostContent}></textarea>
                        </p>
                    </div>
                    <nav className="level"><button className="button is-info" onClick={handlePostSubmit}>Submit</button></nav>
                </div>
            </article>
        </div>}
        </React.Fragment>
    );
};

export default WritePost;