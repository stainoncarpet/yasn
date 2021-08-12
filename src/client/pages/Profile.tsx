import React from 'react';

import Layout from "../components/common/Layout/Layout";
import UserProfile from "../components/Profile/Profile";
import useCollapseMenus from '../custom-hooks/use-collapse-menus';

const Profile = () => {
    useCollapseMenus();
    
    return (
        <React.Fragment>
            <Layout>
            <UserProfile />
            </Layout>
        </React.Fragment>
    )
}

export default Profile
