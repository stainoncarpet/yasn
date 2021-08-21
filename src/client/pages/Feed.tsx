import React from 'react';

import Layout from "../components/common/Layout/Layout";
import useCollapseMenus from '../custom-hooks/use-collapse-menus';
import FeedComponent from '../components/Feed/Feed';

const Feed = () => {
    useCollapseMenus();

    return (
        <React.Fragment>
            <Layout>
            <FeedComponent />
            </Layout>
        </React.Fragment>
    );
};

export default Feed;