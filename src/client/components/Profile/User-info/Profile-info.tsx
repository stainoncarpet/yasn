import React from 'react';

import "./User-info.scss";

import Heading1 from '../../common/Heading1/Heading1';

// Static data from Redux for now
const UserInfo = ({info}) => {
    return (
        <React.Fragment>
        <Heading1>User info</Heading1>
        <div className="user-info mb-6" data-user-id={info._id}>
            <div className="user-avatar-big-container">
                <img src={`http://localhost:3000/${info.avatar}`} />
            </div>
            <div>Full Name: {info.fullName}</div>
            <div>User Name: {info.userName}</div>
            <div>Date of birth: {info.dateOfBirth}</div>
            <div>Date of registration: {info.dateOfRegistration}</div>
        </div>
        </React.Fragment>
    );
};

export default UserInfo;