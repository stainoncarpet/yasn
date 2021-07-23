import React from 'react';

import timer from '../../../../../../helpers/timer';

const Comment = (props) => {
    const {comment, likers, dislikers, userId, handleVote} = props;

    React.useEffect(() => {
        console.log(`comment ${comment.id} rendered`); 
    });

    return (
        <article className="media" key={`comment-id-${comment.id}`} data-user-id={comment.author.id} data-comment-id={comment.id}>
            <figure className="media-left">
                <p className="image is-48x48">
                    <img src={`http://localhost:3000/${comment.author.avatar}`} />
                </p>
            </figure>
            <div className="media-content">
                <div className="content">
                    <p>
                        <strong>{comment.author.fullName}</strong> @{`${comment.author.userName}`}
                        <br />
                        {comment.content}
                        <br />
                        <small>
                            <i 
                                className="far fa-thumbs-up social-action" 
                                style={{color: likers.includes(userId) ? "green" : "initial"}} 
                                onClick={() => handleVote(comment.id, 1)}> 
                                {likers.length > 0 ? likers.length : " "}</i> 
                            <i 
                                className="far fa-thumbs-down social-action" 
                                style={{color: dislikers.includes(userId) ? "red" : "initial"}}
                                onClick={() => handleVote(comment.id, -1)}> 
                                {dislikers.length > 0 ? dislikers.length : " "}
                            </i> 
                            {" " + timer.calculateTimeDifference(comment.dateOfPublication)}
                        </small>
                    </p>
                </div>
            </div>
        </article>
    );
};

export default Comment
