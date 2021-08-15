import React from 'react';

import Heading from '../common/Heading/Heading';

const ConversationsList = () => {
    return (
        <section className="section">
            <Heading type={1}>Conversations</Heading>
            <p>You have no conversations</p>
        </section>
    );
};

export default ConversationsList;
