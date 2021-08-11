import React from 'react';

import Layout from "../components/common/Layout/Layout";
import FriendsListFull from '../components/Friends-list-full/Friends-list-full';

const Friends = () => {
    return (
        <React.Fragment>
            <Layout>
            <FriendsListFull />
            </Layout>
        </React.Fragment>
    );
};

export default Friends;