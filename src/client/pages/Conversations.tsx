import React from 'react';

import Layout from "../components/common/Layout/Layout";
import ConversationsList from '../components/Conversations-list/Conversations-list';

const Conversations = () => {
    return (
        <React.Fragment>
            <Layout>
            <ConversationsList />
            </Layout>
        </React.Fragment>
    );
};

export default Conversations;