import React from 'react';

import UserContext from '../../../../data/context/User-context';

import WriteComment from '../Write-comment/Write-comment';
import Comments from './Comments/Comments';

import { fetchComments } from '../../../../data/redux/slices/posts/thunks';
import { useDispatch } from 'react-redux';
import postsSlice from '../../../../data/redux/slices/posts/posts';

const Post = (props) => {
    const { post, timeDifference, likers, dislikers } = props;
    const [commentContent, setCommentContent] = React.useState("");
    const {state} = React.useContext<any>(UserContext);
    const [replyToComment, setReplyToComment] = React.useState(null);
    const [isWriteCommentBoxVisible, setIsWriteCommentBoxVisible] = React.useState(false);

    const votePost = postsSlice.actions["server/vote/post"];
    const postComment = postsSlice.actions["server/create/comment"];

    const dispatch = useDispatch();

    const handlePostComment = React.useCallback(async () => {
        //@ts-ignore
        dispatch(postComment({token: state.user.token, commentContent: commentContent, postId: post._id, replyTo: replyToComment}));
        setCommentContent("");
    }, [commentContent]);

    const handleSetCommentContent = React.useCallback((e) => {setCommentContent(e.target.value);}, []);

    const handleVote = async (pid, result) => {
        //@ts-ignore
        dispatch(votePost({token: state.user.token, postId: pid, result: result}));
    };

    const handleLoadComments = () => {
        if(post.comments.length > 0) {
            //@ts-ignore
            dispatch(fetchComments(post._id));
        }

        setIsWriteCommentBoxVisible(!isWriteCommentBoxVisible);
    };

    const arePostCommentsVisible = post.comments.length > 0 && typeof post.comments[0] !== "string"
    
    return (
    <div className="post-entity" data-post-id={post._id}>
            <article className="media">
                <figure className="media-left">
                    <p className="image is-64x64">
                        <img src={`http://localhost:3000/${post.author.avatar}`} />
                    </p>
                </figure>
                <div className="media-content">
                    <div className="content">
                        <p>
                            <strong>{post.author.fullName}</strong> <span>{` @${post.author.userName}`}</span><br />
                            <span className="post-title">{post.title}</span><br />{post.content}<br />
                            <small>
                                <i 
                                    className="far fa-thumbs-up social-action" 
                                    style={{color: likers.includes(state.user.id) ? "green" : "initial"}} 
                                    onClick={() => handleVote(post._id, 1)}
                                > 
                                    {likers.length > 0 && likers.length}
                                </i> 
                                <i 
                                    className="far fa-thumbs-down social-action" 
                                    style={{color: dislikers.includes(state.user.id) ? "red" : "initial"}} 
                                    onClick={() => handleVote(post._id, -1)}
                                > 
                                    {dislikers.length > 0 && dislikers.length}
                                </i> 
                                <i 
                                    className="far fa-comment-dots social-action" 
                                    onClick={handleLoadComments}
                                > 
                                    {post.comments.length > 0 && post.comments.length}
                                </i>
                                {post.author._id !== state.user.id && <i className="far fa-share-square social-action" onClick={() => {}}></i>}
                                {" " + timeDifference}
                            </small>
                        </p>
                    </div>
                    {arePostCommentsVisible 
                        && <Comments comments={post.comments} />
                    }
                </div>
            </article>
            {isWriteCommentBoxVisible 
                && <WriteComment commentContent={commentContent} setCommentContent={handleSetCommentContent} postComment={handlePostComment} />
            }
        </div>
    );
};

export default React.memo(Post);
