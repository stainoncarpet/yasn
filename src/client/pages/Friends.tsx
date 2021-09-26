import React from 'react';

import Layout from "../components/common/Layout/Layout";
import FriendsListFull from '../components/specific/Friends-list-full/Friends-list-full';
import useCollapseMenus from '../custom-hooks/use-collapse-menus';

const Friends = () => {
    useCollapseMenus();

    return (
        <React.Fragment>
            <Layout>
            <FriendsListFull />
            </Layout>
        </React.Fragment>
    );
};

export default Friends;