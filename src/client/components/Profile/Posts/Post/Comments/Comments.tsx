import React from 'react';
import { useMutation } from '@apollo/client';

import timer from '../../../../../helpers/timer';
import { VOTE_COMMENT } from '../../../../../data/apollo/mutations/vote';
import UserContext from '../../../../../data/context/User-context';

const Comments = (props) => {
    const {comments} = props;
    const [vote, {loading, error}] = useMutation(VOTE_COMMENT);
    const {state, dispatch} = React.useContext<any>(UserContext);

    React.useEffect(() => {
        console.log("any comments? ", comments);
        
    }, []);

    const handleVote = async (cid, result) => {
        const {data} = await vote({variables: {authToken: state.user.token, commentId: cid, voteResult: result}})
    };

    return comments.map((comment) => (
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
                                className="far fa-thumbs-up vote" 
                                style={{color: comment.likers.includes(state.user.id) ? "green" : "initial"}} 
                                onClick={() => handleVote(comment.id, 1)}>
                            </i> {comment.likers.length > 0 ? comment.likers.length : null}
                            <i 
                                className="far fa-thumbs-down vote" 
                                style={{color: comment.dislikers.includes(state.user.id) ? "red" : "initial"}}
                                onClick={() => handleVote(comment.id, -1)}>
                            </i> {comment.dislikers.length > 0 ? comment.dislikers.length : null}
                            {timer.calculateTimeDifference(comment.dateOfPublication)}
                        </small>
                    </p>
                </div>
            </div>
        </article>
    ));
};

export default Comments;
