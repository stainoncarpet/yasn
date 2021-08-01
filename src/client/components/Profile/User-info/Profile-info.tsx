import React from 'react';
import { useDispatch } from 'react-redux';

import userSlice from '../../../data/redux/slices/user/user';

import "./User-info.scss";

const UserInfo = ({ info: { avatar, fullName, userName, dateOfBirth, dateOfRegistration, friendshipStatus, lastOnline }, auth }) => {
    const dispatch = useDispatch();
    const sendFriendRequest = userSlice.actions['server/send/frequest'];

    const handleSendFriendRequest = () => {
        dispatch(sendFriendRequest({userName: userName, senderToken: auth.token}));
    };

    const isTheSameUser = auth.userName === userName

    return (
        <React.Fragment>
            <div className="user-info mb-6 has-text-centered">
                <div className="user-avatar-big-container">
                    <img src={`http://localhost:3000/${avatar}`} />
                </div>
                <h1 className="title is-1">{fullName}</h1>
                <h2 className="subtitle is-3">@{userName}</h2>
                {!isTheSameUser && <time dateTime={lastOnline}>Last online: {new Date(lastOnline).toLocaleString()}</time>}
                {isTheSameUser
                    ? null
                    : friendshipStatus === "friends"
                        ? "You are friends"
                        : friendshipStatus === "pending"
                            ? <div className="mt-4">
                                <button className="button is-danger is-outlined" onClick={handleSendFriendRequest}>
                                    Cancel Friend Request
                                </button>
                            </div>
                            : <div className="mt-4">
                                <button className="button is-primary is-outlined" onClick={handleSendFriendRequest}>
                                    {`Add ${fullName} to Friends`}
                                </button>
                            </div>
                }
            </div>
        </React.Fragment>
    );
};

export default UserInfo;