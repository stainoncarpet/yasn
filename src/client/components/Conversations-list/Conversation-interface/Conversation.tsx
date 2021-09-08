import React, { ReactElement } from 'react';

import ConversationMessage from './Conversation-message';

const Conversation = ({ messages, participants, auth }) => {
    const jsx: Array<ReactElement> = new Array();

    for (let i = messages.length - 1; i >= 0; i--) {
        const { _id, speaker, content, dateOfTyping, isReadBy } = messages[i];

        // matching conversation participant's indentity with message author's identity
        const focusedParticipant = participants?.find((participant) => participant._id === speaker);
        const seenByUsers = new Array();

        for (let i = 0; i < participants.length; i++) {
            if (isReadBy.includes(participants[i]._id)) {
                seenByUsers.push({ fullName: participants[i].fullName, avatar: participants[i].avatar });
            }
        }

        jsx.push(<ConversationMessage
            key={_id}
            messageId={_id}
            userId={auth._id}
            content={content}
            dateOfTyping={dateOfTyping}
            focusedParticipant={focusedParticipant}
            isRead={isReadBy.includes(auth._id)}
            seenByUsers={seenByUsers}
        />)
    }

    return <React.Fragment>{jsx}</React.Fragment>
};

export default React.memo(Conversation);
