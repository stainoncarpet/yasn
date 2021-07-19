import React from 'react';
import {useMutation} from "@apollo/client";

import WriteComment from '../Write-comment/Write-comment';
import {CREATE_COMMENT} from "../../../../data/apollo/mutations/create-comment";
import UserContext from '../../../../data/context/User-context';
import Comments from './Comments/Comments';
import { VOTE_POST } from '../../../../data/apollo/mutations/vote';

const Post = (props) => {
    const { post, timeDifference } = props;
    const [commentContent, setCommentContent] = React.useState("");
    const {state, dispatch} = React.useContext<any>(UserContext);
    const [replyToComment, setReplyToComment] = React.useState(null);

    const [postComment, {loading, error}] = useMutation(CREATE_COMMENT);
    const [votePost, {loading: loading3, error: error3}] = useMutation(VOTE_POST);

    const handlePostComment = React.useCallback(async () => {
        console.log(state.user.token, commentContent, post.id, replyToComment);
        
        const {data} = await postComment({variables: {authToken: state.user.token, content: commentContent, postId: post.id, replyTo: replyToComment}});
    }, [commentContent]);

    const handleSetCommentContent = React.useCallback((e) => {
        setCommentContent(e.target.value);
    }, []);

    const handleVote = async (pid, result) => {
        const {data} = await votePost({variables: {authToken: state.user.token, postId: pid, voteResult: result}})
    };

    React.useEffect(() => {
        console.log(post.likers.map((obj) => obj.id));
        
    }, []);

    const likerIds = post.likers.map((obj) => obj.id);
    const dislikerIds = post.dislikers.map((obj) => obj.id)

    return (
        <div className="post-entity">
            <article className="media">
                <figure className="media-left">
                    <p className="image is-64x64">
                        <img src={`http://localhost:3000/${post.author.avatar}`} />
                    </p>
                </figure>
                <div className="media-content">
                    <div className="content">
                        <p>
                            <strong>{post.author.fullName}</strong> <span>{` @${post.author.userName}`}</span>
                            <br />
                            <span className="post-title">{post.title}</span>
                            <br />
                            {post.content}
                            <br />
                            <small>
                                <i 
                                    className="far fa-thumbs-up vote" 
                                    style={{color: likerIds.includes(state.user.id) ? "green" : "initial"}} 
                                    onClick={() => handleVote(post.id, 1)}>
                                </i> {likerIds.length > 0 ? likerIds.length : null}
                                <i 
                                    className="far fa-thumbs-down vote" 
                                    style={{color: dislikerIds.includes(state.user.id) ? "red" : "initial"}} 
                                    onClick={() => handleVote(post.id, -1)}>
                                </i> {dislikerIds.length > 0 ? dislikerIds.length : null}
                                {timeDifference}
                                </small>
                        </p>
                    </div>

                    <Comments comments={post.comments} />
                </div>
            </article>
            <WriteComment 
                commentContent={commentContent} 
                setCommentContent={handleSetCommentContent} 
                postComment={handlePostComment} 
            />
        </div>
    );
};

export default Post;
