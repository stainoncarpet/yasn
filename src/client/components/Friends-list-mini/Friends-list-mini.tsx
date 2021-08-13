import React from 'react';
import { Link } from 'react-router-dom';

import "./Friends-list-mini.scss";

import Heading1 from '../common/Heading1/Heading1';

const FriendsListMini = ({friends}) => {
    return <React.Fragment>
        <Heading1><Link to="/friends">Friends ({friends?.length})</Link></Heading1>
        <div className="friends-list-mini mb-6">
            {friends?.map(({user}) =>
                {
                    return <Link to={`/profile/${user.userName.toLowerCase()}`} key={user._id}>
                            <div className="friend">
                                <div className="friend-avatar-container">
                                    <img src={`http://localhost:3000/${user.avatar}`} className="friend-avatar-image" />
                                </div>
                                <div className="friend-info">{user.fullName}</div>
                            </div>
                        </Link>
                }
            )}
        </div>
    </React.Fragment>
};

export default FriendsListMini;
