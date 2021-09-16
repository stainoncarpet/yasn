import React from 'react';
import { Link } from 'react-router-dom';

import "./Conversations-list-item.scss";

//@ts-ignore
const app_address = APP_ADDRESS;

const ConversationsListItem = ({ id, interlocutor, lastMessage, auth, typingUsers }) => {
    let speakerName: string;

    switch (typeof lastMessage.speaker) {
        case "object":
            if (lastMessage.speaker._id === auth._id) {
                speakerName = "You";
            } else {
                speakerName = lastMessage.speaker.fullName;
            }
            break;
        case "string":
            speakerName = interlocutor.fullName;
            break;
        default: speakerName = interlocutor.fullName;
    }

    return (
        <div className="conversations-list-item" key={id} style={{backgroundColor: lastMessage.isUnRead ? "#e7f0fa" : "white" }}>
            <Link to={`/conversations/${id}`}>
                {typingUsers && typingUsers.length > 0
                    ? (<div className="conversations-list-info">
                        <figure className="image is-96x96">
                            <img className="is-rounded" src={`${app_address}/${typingUsers[0].avatar}`} alt={`${typingUsers[0].fullName}'s avatar`} />
                        </figure>
                        <div className="conversation-last-message" data-message-id={null}>
                            <div>{typingUsers[0].fullName} is typing a message...</div>
                        </div>
                    </div>)
                    : (<div className="conversations-list-info">
                        <figure className="image is-96x96">
                            <img className="is-rounded" src={`${app_address}/${interlocutor.avatar}`} alt={`${interlocutor.fullName}'s avatar`} />
                        </figure>
                        <div className="conversation-last-message" data-message-id={lastMessage.id}>
                            <div>{speakerName}: {lastMessage.content}</div>
                        </div>
                    </div>)
                }
            </Link>
        </div>
    );
};

export default React.memo(ConversationsListItem);
