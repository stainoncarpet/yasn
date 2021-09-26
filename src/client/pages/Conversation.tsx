import React from 'react';

import Layout from '../components/common/Layout/Layout';
import useCollapseMenus from '../custom-hooks/use-collapse-menus';
import ConversationInterface from '../components/specific/Conversations-list/Conversation-interface/Conversation-interface';

const Conversation = () => {
    useCollapseMenus();

    return (
        <React.Fragment>
            <Layout>
                <ConversationInterface />
            </Layout>
        </React.Fragment>
    );
};

export default Conversation;
