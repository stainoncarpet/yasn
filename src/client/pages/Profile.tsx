import React from 'react';
import { useSelector } from 'react-redux';

import Layout from "../components/common/Layout/Layout";
import UserProfile from "../components/Profile/Profile";
import useCollapseMenus from '../custom-hooks/use-collapse-menus';
import Portal from '../components/Portal/Portal';
import WritePost from '../components/Profile/Posts/Write-post-form/Write-post-form';

const Profile = () => {
    useCollapseMenus();

    const isPortalShown = useSelector((state: any) => state.misc.portal.isShown);
    
    return (
        <React.Fragment>
            <Layout>
            <UserProfile />
            </Layout>
            {isPortalShown && <Portal><WritePost /></Portal>}
        </React.Fragment>
    );
};

export default Profile;