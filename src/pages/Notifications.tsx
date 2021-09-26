import React from 'react';

import Layout from "../components/common/Layout/Layout";
import NotificationsList from '../components/specific/Notifications-list/Notifications-list';
import useCollapseMenus from '../custom-hooks/use-collapse-menus';

const Notifications = () => {
    useCollapseMenus();

    return (
        <React.Fragment>
            <Layout>
            <NotificationsList />
            </Layout>
        </React.Fragment>
    );
};

export default Notifications;