import React from 'react';
import { useSelector } from 'react-redux';

import "./User-info.scss";

import Heading1 from '../../common/Heading1/Heading1';

// Static data from Redux for now
const UserInfo = () => {
    const user = useSelector((state: any) => state.user)

    return (
        <React.Fragment>
        <Heading1>User info</Heading1>
        <div className="user-info mb-6">
            <div className="user-avatar-big-container">
                <img src={`http://localhost:3000/${user.avatar}`} />
            </div>
            <div>Full Name: {user.fullName}</div>
            <div>User Name: {user.userName}</div>
            <div>Email: {user.email}</div>
            <div>Date of birth: {user.dateOfBirth}</div>
            <div>Date of registration: {user.dateOfRegistration}</div>
        </div>
        </React.Fragment>
    );
};

export default UserInfo;