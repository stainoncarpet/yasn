import React from 'react';
import { useMutation, useSubscription } from '@apollo/client';

import UserContext from '../../../../../../data/context/User-context';
import { VOTE_COMMENT } from '../../../../../../data/apollo/mutations/vote';
import timer from '../../../../../../helpers/timer';
import { VOTE_COUNTED } from '../../../../../../data/apollo/subscriptions/vote-counted';

const Comment = (props) => {
    const {comment} = props;

    const [vote, {loading, error}] = useMutation(VOTE_COMMENT);
    const {state, dispatch} = React.useContext<any>(UserContext);
    const {data: subscriptionData, loading: loading2} = useSubscription(VOTE_COUNTED, {variables: {entityType: "comment", entityId: comment.id}});

    const handleVote = async (cid, result) => {
        await vote({variables: {authToken: state.user.token, commentId: cid, voteResult: result}})
    };

    const latestLikers = (subscriptionData && subscriptionData.voteCounted.id === comment.id) ? subscriptionData.voteCounted.likers : comment.likers;
    const latestDislikers = (subscriptionData && subscriptionData.voteCounted.id === comment.id) ? subscriptionData.voteCounted.dislikers : comment.dislikers;

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
                                style={{color: latestLikers.includes(state.user.id) ? "green" : "initial"}} 
                                onClick={() => handleVote(comment.id, 1)}> 
                                {latestLikers.length > 0 ? latestLikers.length : " "}</i> 
                            <i 
                                className="far fa-thumbs-down social-action" 
                                style={{color: latestDislikers.includes(state.user.id) ? "red" : "initial"}}
                                onClick={() => handleVote(comment.id, -1)}> 
                                {latestDislikers.length > 0 ? latestDislikers.length : " "}
                            </i> 
                            {" " + timer.calculateTimeDifference(comment.dateOfPublication)}
                        </small>
                    </p>
                </div>
            </div>
        </article>
    );
};

export default Comment;
