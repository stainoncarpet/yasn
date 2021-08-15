import React from 'react';

import Heading from '../../../common/Heading/Heading';

import "./Write-post-form.scss";

const WritePost = ({ createPost, cancel }) => {
    const [postTitle, setPostTitle] = React.useState("");
    const [postContent, setPostContent] = React.useState("");

    const handlePostSubmit = async () => {
        createPost(postTitle, postContent);
        setPostTitle("");
        setPostContent("");
    };

    return (
        <div className="new-post">
            <div className="new-post-form my-4">
                <Heading type={1}>Create New Post</Heading>
                <article className="media">
                    <div className="media-content">
                        <div className="field">
                            <input
                                className="input is-normal"
                                type="text"
                                placeholder="Post title"
                                value={postTitle}
                                onChange={(e) => setPostTitle(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <p className="control">
                                <textarea
                                    className="textarea"
                                    placeholder="Post content"
                                    value={postContent}
                                    onChange={(e) => setPostContent(e.target.value)}
                                />
                            </p>
                        </div>
                            <button className="button is-success" onClick={handlePostSubmit} disabled={postTitle.length < 1 || postContent.length < 1}>
                                Submit
                            </button>
                            <button onClick={cancel} className="button is-link is-light ml-2">Cancel</button>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default WritePost;