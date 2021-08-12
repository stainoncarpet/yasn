import React from 'react';

import Layout from "../components/common/Layout/Layout";
import ConversationsList from '../components/Conversations-list/Conversations-list';
import useCollapseMenus from '../custom-hooks/use-collapse-menus';

const Conversations = () => {
    useCollapseMenus();

    return (
        <React.Fragment>
            <Layout>
            <ConversationsList />
            </Layout>
        </React.Fragment>
    );
};

export default Conversations;