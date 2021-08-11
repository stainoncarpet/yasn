import React from 'react';

import Layout from "../components/common/Layout/Layout";
import NotificationsList from '../components/Notifications-list/Notifications-list';

const Notifications = () => {
    return (
        <React.Fragment>
            <Layout>
            <NotificationsList />
            </Layout>
        </React.Fragment>
    );
};

export default Notifications;