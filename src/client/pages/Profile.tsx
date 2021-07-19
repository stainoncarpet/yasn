import React from 'react';

import Layout from "../components/common/Layout/Layout";
import UserProfile from "../components/Profile/Profile";

const Profile = () => {
    return (
        <React.Fragment>
            <Layout>
            <UserProfile />
            </Layout>
        </React.Fragment>
    )
}

export default Profile
