import React from 'react';

import "./User-info.scss";

import Heading1 from '../../common/Heading1/Heading1';

// Static data from Redux for now
const UserInfo = ({id, fullName, userName, dateOfBirth, dateOfRegistration, avatar}) => {
    return (
        <React.Fragment>
        <Heading1>User info</Heading1>
        <div className="user-info mb-6" data-user-id={id}>
            <div className="user-avatar-big-container">
                <img src={`http://localhost:3000/${avatar}`} />
            </div>
            <div>Full Name: {fullName}</div>
            <div>User Name: {userName}</div>
            <div>Date of birth: {dateOfBirth}</div>
            <div>Date of registration: {dateOfRegistration}</div>
        </div>
        </React.Fragment>
    );
};

export default UserInfo;