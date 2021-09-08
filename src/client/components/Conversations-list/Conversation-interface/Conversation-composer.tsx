import React from 'react';

const ConversationComposer = ({messageContent, handleSetMessageContent, handeSendMessage}) => {
    return (
        <div className="conversation-compose">
                <article className="media compose-box">
                    <div className="media-content">
                        <div className="field message-content">
                            <p className="control">
                                <textarea className="textarea" placeholder="Message content" value={messageContent} onChange={(e) => handleSetMessageContent(e.target.value)} />
                            </p>
                        </div>
                        <div className="button-container">
                            <button className="button is-info" onClick={handeSendMessage}>Send</button>
                        </div>
                    </div>
                </article>
            </div>
    );
};

export default ConversationComposer;
