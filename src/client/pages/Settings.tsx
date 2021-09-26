import React from 'react';

import Layout from "../components/common/Layout/Layout";
import useCollapseMenus from '../custom-hooks/use-collapse-menus';
import AccountSettings from '../components/specific/Account-settings/Account-settings';

const Settings = () => {
    useCollapseMenus();

    return (
        <React.Fragment>
            <Layout>
                <AccountSettings />
            </Layout>
        </React.Fragment>
    );
};

export default Settings;