import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Heading from '../../../common/Heading/Heading';

import "./Write-post-form.scss";
import profileSlice from '../../../../redux/slices/profile/profile';
import miscSlice from '../../../../redux/slices/misc/misc';

const WritePost = () => {
    const [postTitle, setPostTitle] = React.useState("");
    const [postContent, setPostContent] = React.useState("");

    const auth = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

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
                            <button className="button is-success" onClick={() => dispatch(profileSlice.actions['server/create/post']({token: auth.token, postTitle, postContent }))} disabled={postTitle.length < 1 || postContent.length < 1}>
                                Submit
                            </button>
                            <button onClick={() => dispatch(miscSlice.actions.togglePortal({}))} className="button is-link is-light ml-2">Cancel</button>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default WritePost;