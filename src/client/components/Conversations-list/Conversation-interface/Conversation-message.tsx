import React from 'react';
import { Link } from 'react-router-dom';

import timer from '../../../helpers/timer';

const ConversationMessage = ({speaker, content, dateOfTyping, focusedParticipant, auth}) => {

    return (
        <div className={speaker === auth._id ? "conversation-message" : "conversation-message reverse"}>
            <div className="speaker-box">
                <Link to={`/profile/${focusedParticipant?.userName?.toLowerCase()}`}>
                    <figure className="image is-64x64">
                        <img className="is-rounded" src={`http://localhost:3000/${focusedParticipant?.avatar}`} />
                    </figure>
                    <div className="speaker-name" style={{ textAlign: "center" }}>
                        {speaker === auth._id ? "You" : focusedParticipant?.fullName?.split(" ")[0]}
                    </div>
                </Link>
            </div>
            <div className="conversation-message-content">
                <div>{content}</div>
                <div>
                    <time className="conversation-message-timestamp" style={{ fontStyle: "italic", fontSize: "75%" }}>
                        {timer.calculateTimeDifference(dateOfTyping)}
                    </time>
                </div>
            </div>
        </div>);
};

export default React.memo(ConversationMessage);