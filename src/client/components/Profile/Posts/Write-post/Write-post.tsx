import React from 'react';

const WritePost = ({showNewPostButton, createPost}) => {
    const [postTitle, setPostTitle] = React.useState("");
    const [postContent, setPostContent] = React.useState("");
    const [isCreateNewPostShown, toggleCreateNewPost] = React.useState(false);

    const handlePostSubmit = async () => {
        createPost(postTitle, postContent);
        setPostTitle("");
        setPostContent("");
    };

    return (
        <React.Fragment>
        { showNewPostButton 
            && <button 
                    className="button is-link is-light" 
                    onClick={() => toggleCreateNewPost(!isCreateNewPostShown)}>
                        {isCreateNewPostShown ? "- Hide" : "+ New Post"}
                </button>
        }
        { isCreateNewPostShown 
            && <div className="new-post-form my-4">
                    <h3 className="subtitle is-3">Create New Post</h3>
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
                            <nav className="level">
                                <button className="button is-info" onClick={handlePostSubmit} disabled={postTitle.length < 1 || postContent.length < 1}>
                                    Submit
                                </button>
                            </nav>
                        </div>
                    </article>
                </div>
        }
        </React.Fragment>
    );
};

export default WritePost;