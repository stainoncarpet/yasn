import React from 'react';
import { useDispatch } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

import userSlice from '../../../data/redux/slices/user/user';
import timer from '../../../helpers/timer';

import "./User-info.scss";

const UserInfo = ({ info: { _id, avatar, fullName, userName, dateOfBirth, dateOfRegistration, friendshipStatusWithRequester, lastOnline }, auth, isLoading }) => {
    const dispatch = useDispatch();
    const sendFriendRequest = userSlice.actions['server/send/frequest'];
    const cancelFriendship = userSlice.actions["server/cancel/friendship"];
    const acceptFriendRequest = userSlice.actions["server/accept/frequest"];
    const rejectFriendRequest = userSlice.actions["server/reject/frequest"];
    const withdrawFriendRequest = userSlice.actions["server/withdraw/frequest"];

    const handleSendFriendRequest = () => dispatch(sendFriendRequest({ userName: userName, senderToken: auth.token }));

    const handleWithdrawFriendRequest = () => dispatch(withdrawFriendRequest({ withdrawerToken: auth.token, fshipId: friendshipStatusWithRequester?.fshipId }));

    const handleCancelFriendship = () => dispatch(cancelFriendship({ cancelerToken: auth.token, fshipId: friendshipStatusWithRequester?.fshipId }));

    const handleAcceptFriendRequest = () => dispatch(acceptFriendRequest({accepterToken: auth.token, fshipId: friendshipStatusWithRequester?.fshipId}));

    const handleRejectFriendRequest = () => dispatch(rejectFriendRequest({rejecterToken: auth.token, fshipId: friendshipStatusWithRequester?.fshipId}));

    const isTheSameUser = auth.userName?.toLowerCase() === userName?.toLowerCase();

    return (
        <React.Fragment>
            <div className="user-info mb-6 has-text-centered">
                <div className="user-avatar-big-container">
                    {isLoading ? <Skeleton circle={true} height={"100%"} width={"100%"} /> : <img src={`http://localhost:3000/${avatar}`} />}
                </div>
                <h1 className="title is-1 mt-5">{isLoading ? <Skeleton width={"60%"} /> : fullName}</h1>
                <h2 className="subtitle is-3">{isLoading ? <Skeleton width={"60%"} /> : `@${userName}`}</h2>
                {isLoading ? <Skeleton width={"30%"} /> : !isTheSameUser && <time dateTime={lastOnline}>Last online: {timer.calculateTimeDifference(lastOnline)}</time>}
                {isLoading ? <div style={{textAlign: "center"}}><Skeleton height={40} width={"30%"} /></div> : 
                    isTheSameUser
                        ? null
                        : friendshipStatusWithRequester?.status === "friends"
                            ? <div className="mt-4">
                                <button className="button is-danger is-outlined" onClick={handleCancelFriendship}>
                                    {`Unfriend ${fullName}`}
                                </button>
                            </div>
                            : friendshipStatusWithRequester?.status === "pending"
                                ? friendshipStatusWithRequester?.initiatorId === auth._id
                                    ? <div className="mt-4">
                                        <button className="button is-danger is-outlined" onClick={handleWithdrawFriendRequest}>
                                            {`Cancel Friend Request`}
                                        </button>
                                    </div>
                                    : <React.Fragment>
                                        <div className="mt-4">
                                            <button className="button is-primary is-outlined" onClick={handleAcceptFriendRequest}>
                                                {`Accept Friend Request`}
                                            </button>
                                        </div>
                                        <div className="mt-4">
                                            <button className="button is-danger is-outlined" onClick={handleRejectFriendRequest}>
                                                {`Reject Friend Request`}
                                            </button>
                                        </div>
                                    </React.Fragment>
                                : <div className="mt-4">
                                    <button className="button is-outlined" onClick={handleSendFriendRequest}>
                                        {`Befriend ${fullName}`}
                                    </button>
                                </div>
                }
            </div>
        </React.Fragment>
    );
};

export default UserInfo;