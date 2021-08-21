import React from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

import "./Friends-list-mini.scss";

import Heading from '../common/Heading/Heading';

interface Props {
    friends: Array<any>, 
    whoseFriends: Boolean, 
    isLoading: Boolean
}

const FriendsListMini: React.FC<Props> = ({friends, whoseFriends, isLoading})=> {
    return <React.Fragment>
        {isLoading ? <Skeleton height={60} width={"50%"} />  : <Heading type={2}><Link to="/friends">{whoseFriends} Friends ({friends?.length})</Link></Heading>}
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
