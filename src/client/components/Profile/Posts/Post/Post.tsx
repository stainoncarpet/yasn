import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import "./Post.scss"

import WriteComment from '../Write-comment/Write-comment';
import Comments from './Comments/Comments';

import { fetchComments } from '../../../../redux/slices/profile/thunks';
import profileSlice from '../../../../redux/slices/profile/profile';
import { IStoreState } from '../../../../interfaces/state/i-store-state';

const Post = (props) => {
    const { post, timeDifference } = props;
    const [commentContent, setCommentContent] = React.useState("");
    const [replyToComment, setReplyToComment] = React.useState(null);

    const user = useSelector((state: IStoreState) => state.auth);

    const votePost = profileSlice.actions["server/vote/post"];
    const postComment = profileSlice.actions["server/create/comment"];
    const deletePost = profileSlice.actions["server/delete/post"];
    const hideComments = profileSlice.actions.hideComments;

    const dispatch = useDispatch();

    const handlePostComment = React.useCallback(async () => {
        //@ts-ignore
        dispatch(postComment({ token: user.token, commentContent: commentContent, postId: post._id, replyTo: replyToComment }));
        setCommentContent("");
    }, [commentContent]);

    const handleSetCommentContent = React.useCallback((e) => { setCommentContent(e.target.value); }, []);

    const handleVote = async (pid, result) => {
        //@ts-ignore
        dispatch(votePost({ token: user.token, postId: pid, result: result }));
    };

    const handleLoadComments = () => {
        if(!post.areCommentsDisplayed) {
            dispatch(fetchComments({ postId: post._id }));
        } else {
            console.log("hide comments ", post._id);
            dispatch(hideComments({postId: post._id}));
        }
    };

    const handleDeletePost = () => {
        //@ts-ignore
        dispatch(deletePost({ token: user.token, postId: post._id }));
    };

    const isCurrentUser = post.author._id === user._id;

    return (
        <div className="post-entity" data-post-id={post._id}>
            <article className="media">
                <Link to={`/profile/${post.author.userName.toLowerCase()}`}>
                    <figure className="media-left">
                        <p className="image is-64x64">
                            <img src={`http://localhost:3000/${post.author.avatar}`} />
                        </p>
                    </figure>
                </Link>
                <div className="media-content">
                    <div className="content">
                        <p>
                            <Link to={`/profile/${post.author.userName.toLowerCase()}`}>
                                <strong>{post.author.fullName}</strong>
                            </Link> <span>{` @${post.author.userName}`}</span><br />
                            <span className="post-title">{post.title}</span><br />{post.content}<br />
                            <small>
                                <i
                                    className="far fa-thumbs-up social-action"
                                    style={{ color: post.likers.includes(user._id) ? "green" : "initial" }}
                                    onClick={() => handleVote(post._id, 1)}
                                >
                                    {post.likers.length > 0 && post.likers.length}
                                </i>
                                <i
                                    className="far fa-thumbs-down social-action"
                                    style={{ color: post.dislikers.includes(user._id) ? "red" : "initial" }}
                                    onClick={() => handleVote(post._id, -1)}
                                >
                                    {post.dislikers.length > 0 && post.dislikers.length}
                                </i>
                                <i
                                    className="far fa-comment-dots social-action"
                                    onClick={handleLoadComments}
                                >
                                    {post.comments.length > 0 && post.comments.length}
                                </i>
                                {!isCurrentUser && <i className="far fa-share-square social-action" onClick={() => { }}></i>}
                                {" " + timeDifference}
                            </small>
                        </p>
                    </div>
                    {post.areCommentsDisplayed && <Comments comments={post.comments} />}
                </div>
            </article>
            {post.areCommentsDisplayed && 
                <WriteComment commentContent={commentContent} setCommentContent={handleSetCommentContent} postComment={handlePostComment} />
            }
            {isCurrentUser && <button className="delete is-medium" onClick={handleDeletePost} />}
        </div>
    );
};

export default React.memo(Post);
