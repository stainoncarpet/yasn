import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Heading from '../../../common/Heading/Heading';

import "./Write-post-form.scss";
import profileSlice from '../../../../redux/slices/profile/profile';
import miscSlice from '../../../../redux/slices/misc/misc';
import { IStoreState } from '../../../../interfaces/state/i-store-state';

const WritePost = () => {
    const [postTitle, setPostTitle] = React.useState("");
    const [postContent, setPostContent] = React.useState("");

    const auth = useSelector((state: IStoreState) => state.auth);
    const dispatch = useDispatch();

    const handleSubmitPost = () => {
        dispatch(profileSlice.actions['server/create/post']({token: auth.token, postTitle, postContent }));
        dispatch(miscSlice.actions.togglePortal({}));
    };

    const cancelPost = () => dispatch(miscSlice.actions.togglePortal({}));

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
                            <button className="button is-success" onClick={handleSubmitPost} disabled={postTitle.length < 1 || postContent.length < 1}>
                                Submit
                            </button>
                            <button onClick={cancelPost} className="button is-link is-light ml-2">Cancel</button>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default WritePost;