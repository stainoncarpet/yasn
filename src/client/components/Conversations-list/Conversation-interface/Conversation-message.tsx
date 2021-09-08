import React from 'react';
import { Link } from 'react-router-dom';

import timer from '../../../helpers/timer';

import "./Conversation-message.scss";

const ConversationMessage = ({content, dateOfTyping, focusedParticipant, userId, isRead, messageId, seenByUsers}) => {
    const isCurrentUser = focusedParticipant._id === userId;

    React.useEffect(() => console.log("message rendered"))

    return (
        <div className={isCurrentUser ? "conversation-message" : "conversation-message reverse"} data-message-id={messageId} data-message-read={isRead}>
            <div className="speaker-box">
                <Link to={`/profile/${focusedParticipant?.userName?.toLowerCase()}`}>
                    <figure className="image is-64x64">
                        <img className="is-rounded" src={`http://localhost:3000/${focusedParticipant?.avatar}`} />
                    </figure>
                    <div className="speaker-name" style={{ textAlign: "center" }}>
                        {isCurrentUser ? "You" : focusedParticipant?.fullName?.split(" ")[0]}
                    </div>
                </Link>
            </div>
            <div className="conversation-message-content">
                <div style={{minHeight: "3rem"}}>{content}</div>
                <div className="meta-data">
                    <time className="conversation-message-timestamp" style={{ fontStyle: "italic", fontSize: "75%" }}>
                        {timer.calculateTimeDifference(dateOfTyping)}
                    </time>
                    {seenByUsers.length > 0 && <div style={{display:"flex", alignItems: "center"}}>
                        <span style={{ fontStyle: "italic", fontSize: "75%"}}>Seen by:</span> 
                        {seenByUsers?.map(({fullName, avatar}) => 
                            <figure className="image is-32x32 ml-1" key={fullName}>
                                <img className="is-rounded" src={`http://localhost:3000/${avatar}`} />
                            </figure>)
                        }
                    </div>}
                </div>
            </div>
        </div>);
};

export default React.memo(ConversationMessage, (prev, next) => {
    if(prev.seenByUsers.length !== next.seenByUsers.length) {
        return false;
    } else {
        return true;
    }
});
//export default ConversationMessage;