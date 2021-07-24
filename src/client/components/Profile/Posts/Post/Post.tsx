import React from 'react';
import {useMutation, useLazyQuery} from "@apollo/client";

import UserContext from '../../../../data/context/User-context';

import WriteComment from '../Write-comment/Write-comment';
import Comments from './Comments/Comments';

import { VOTE_POST } from '../../../../data/apollo/mutations/vote';
import { GET_COMMENTS } from '../../../../data/apollo/queries/get-comments';
import {CREATE_COMMENT} from "../../../../data/apollo/mutations/create-comment";
import { fetchComments } from '../../../../data/redux/slices/posts';
import { useDispatch } from 'react-redux';

const Post = (props) => {
    const { post, timeDifference, likers, dislikers } = props;
    const [commentContent, setCommentContent] = React.useState("");
    const {state} = React.useContext<any>(UserContext);
    const [replyToComment, setReplyToComment] = React.useState(null);

    const dispatch = useDispatch();

    const [postComment] = useMutation(CREATE_COMMENT);
    const [votePost] = useMutation(VOTE_POST);
    const [getComments, {loading, data: commentsData}] = useLazyQuery(GET_COMMENTS);

    const handlePostComment = React.useCallback(async () => {
        console.log(state.user.token, commentContent, post._id, replyToComment);
        
        const {data} = await postComment({variables: {authToken: state.user.token, content: commentContent, postId: post._id, replyTo: replyToComment}});
    }, [commentContent]);

    const handleSetCommentContent = React.useCallback((e) => {setCommentContent(e.target.value);}, []);

    const handleVote = async (pid, result) => await votePost({variables: {authToken: state.user.token, postId: pid, voteResult: result}});

    //const handleLoadComments = () => getComments({variables: {postId: post._id}});

    const handleLoadComments = () => {
        //console.log("LOAD COMMENTS CLICKED FOR POST ", post._id);

        //@ts-ignore
        dispatch(fetchComments(post._id));
    };

    React.useEffect(() => {console.log("post rendered", post._id)});

    const arePostCommentsVisible = post.comments.length > 0 && JSON.stringify(post.comments[0]).includes('content');
    
    return (
    <div className="post-entity" data-post-id={post._id}>
            <article className="media">
                <figure className="media-left"><p className="image is-64x64"><img src={`http://localhost:3000/${post.author.avatar}`} /></p></figure>
                <div className="media-content">
                    <div className="content">
                        <p>
                            <strong>{post.author.fullName}</strong> <span>{` @${post.author.userName}`}</span><br />
                            <span className="post-title">{post.title}</span><br />{post.content}<br />
                            <small>
                                <i className="far fa-thumbs-up social-action" style={{color: likers.includes(state.user.id) ? "green" : "initial"}} onClick={() => handleVote(post._id, 1)}> {likers.length > 0 && likers.length}</i> 
                                <i className="far fa-thumbs-down social-action" style={{color: dislikers.includes(state.user.id) ? "red" : "initial"}} onClick={() => handleVote(post._id, -1)}> {dislikers.length > 0 && dislikers.length}</i> 
                                <i className="far fa-comment-dots social-action" onClick={handleLoadComments}> {post.comments.length > 0 && post.comments.length}</i>
                                {post.author._id !== state.user.id && <i className="far fa-share-square social-action" onClick={() => {}}></i>}
                                {" " + timeDifference}
                            </small>
                        </p>
                    </div>
                    {arePostCommentsVisible && <Comments comments={post.comments} />}
                </div>
            </article>
            {arePostCommentsVisible && <WriteComment commentContent={commentContent} setCommentContent={handleSetCommentContent} postComment={handlePostComment} />}
        </div>
    );
};

export default Post;
