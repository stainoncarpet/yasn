import React from 'react';

import timer from '../../../../../../helpers/timer';

const Comment = (props) => {
    const {comment, userId, handleVote} = props;

    React.useEffect(() => {
        console.log(comment.dislikers);
        console.log("VS");
        console.log(userId);
        
    })

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
                                style={{color: comment.likers.includes(userId) ? "green" : "initial"}} 
                                onClick={() => handleVote(comment._id, 1)}> 
                                {comment.likers.length > 0 ? comment.likers.length : " "}</i> 
                            <i 
                                className="far fa-thumbs-down social-action" 
                                style={{color: comment.dislikers.includes(userId) ? "red" : "initial"}}
                                onClick={() => handleVote(comment._id, -1)}> 
                                {comment.dislikers.length > 0 ? comment.dislikers.length : " "}
                            </i> 
                            {" " + timer.calculateTimeDifference(comment.dateOfPublication)}
                        </small>
                    </p>
                </div>
            </div>
        </article>
    );
};

export default React.memo(Comment);
