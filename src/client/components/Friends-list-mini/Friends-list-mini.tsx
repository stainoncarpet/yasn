import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import "./Friends-list-mini.scss";

import Heading1 from '../common/Heading1/Heading1';
import { getFriends } from '../../data/redux/slices/friends/thunks';

const FriendsListMini = () => {
    const friends = useSelector((state: any) => state.friends);
    const dispatch = useDispatch();
    const { userName } = useParams<any>();

    React.useEffect(() => {
        dispatch(getFriends({ userName }));
    }, [userName])

    return <React.Fragment>
        <Heading1>Friends</Heading1>
        <div className="friends-list-mini mb-6">
            {friends.map(({ _id, fullName, userName, avatar }) =>
                <Link to={`/profile/${userName.toLowerCase()}`} key={_id}>
                    <div className="friend">
                        <div className="friend-avatar-container">
                            <img src={`http://localhost:3000/${avatar}`} className="friend-avatar-image" />
                        </div>
                        <div className="friend-info">{fullName}</div>
                    </div>
                </Link>
            )}
        </div>
    </React.Fragment>
};

export default FriendsListMini;
