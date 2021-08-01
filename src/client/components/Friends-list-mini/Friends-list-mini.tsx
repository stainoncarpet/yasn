import React from 'react';
import { Link } from 'react-router-dom';

import "./Friends-list-mini.scss";

import Heading1 from '../common/Heading1/Heading1';

const FriendsListMini = ({friendships, pageOwnerUserName}) => {
    return <React.Fragment>
        <Heading1>Friends</Heading1>
        <div className="friends-list-mini mb-6">
            {friendships?.map(({user1, user2, dateOfFormation, friendshipStatus}) =>
                {
                    if (friendshipStatus === "friends") {
                        const friend = user1.userName === pageOwnerUserName ? user2 : user1;

                        return <Link to={`/profile/${friend.userName.toLowerCase()}`} key={friend._id}>
                            <div className="friend">
                                <div className="friend-avatar-container">
                                    <img src={`http://localhost:3000/${friend.avatar}`} className="friend-avatar-image" />
                                </div>
                                <div className="friend-info">{friend.fullName}</div>
                            </div>
                        </Link>
                    } else {
                        return null;
                    }
                }
            )}
        </div>
    </React.Fragment>
};

export default FriendsListMini;
