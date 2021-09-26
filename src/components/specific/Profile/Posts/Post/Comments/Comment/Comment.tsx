import React from 'react';
import { Link } from 'react-router-dom';

import timer from '../../../../../../../helpers/timer';

import "./Comment.scss";

import profileSlice from '../../../../../../../redux/slices/profile/profile';

const Comment = (props) => {
    const { comment, userId, handleVote, dispatch, userToken } = props;

    const deleteComment = profileSlice.actions['server/delete/comment'];

    const handleDeleteComment = () => {
        //@ts-ignore
        dispatch(deleteComment({ token: userToken, commentId: comment._id }));
    };

    const isCurrentUser = userId === comment.author._id;

    return (
        <article className="media comment" key={`comment-id-${comment._id}`} data-user-id={comment.author._id} data-comment-id={comment._id}>
            <Link to={`/profile/${comment.author.userName.toLowerCase()}`}>
                <figure className="media-left">
                    <p className="image is-48x48">
                        <img src={`/${comment.author.avatar}`} />
                    </p>
                </figure>
            </Link>
            <div className="media-content">
                <div className="content">
                    <p>
                        <Link to={`/profile/${comment.author.userName.toLowerCase()}`}>
                            <strong>{comment.author.fullName}</strong>
                        </Link> @{`${comment.author.userName}`}
                        <br />
                        {comment.content}
                        <br />
                        <small>
                            <i
                                className="far fa-thumbs-up social-action"
                                style={{ color: comment.likers.includes(userId) ? "green" : "initial" }}
                                onClick={() => handleVote(comment._id, 1)}>
                                {comment.likers.length > 0 ? comment.likers.length : " "}</i>
                            <i
                                className="far fa-thumbs-down social-action"
                                style={{ color: comment.dislikers.includes(userId) ? "red" : "initial" }}
                                onClick={() => handleVote(comment._id, -1)}>
                                {comment.dislikers.length > 0 ? comment.dislikers.length : " "}
                            </i>
                            {" " + timer.calculateTimeDifference(comment.dateOfPublication)}
                        </small>
                    </p>
                </div>
            </div>
            {isCurrentUser && <button className="delete is-medium" onClick={handleDeleteComment} />}
        </article>
    );
};

export default React.memo(Comment);
