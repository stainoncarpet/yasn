import React from 'react';
import Skeleton from 'react-loading-skeleton';

import timer from '../../../../helpers/timer';
import useFriendingFunctionality from '../../../../custom-hooks/use-friending-functionality';

import "./User-info.scss";
import Heading from '../../../common/Heading/Heading';

import { IUserInfoProps } from './IUser-info-props';
import { EFriendshipStatus } from '../../../../interfaces/state/i-profile-slice';

const UserInfo: React.FC<IUserInfoProps> = ({ info: { _id, avatar, fullName, userName, dateOfBirth, dateOfRegistration, friendshipStatusWithRequester, lastOnline }, auth, isLoading }) => {
    const [handleSendFriendRequest, handleWithdrawFriendRequest, handleCancelFriendship, handleAcceptFriendRequest, handleRejectFriendRequest, handleSendMessage] = useFriendingFunctionality();

    const isTheSameUser = auth.userName?.toLowerCase() === userName?.toLowerCase();

    return (<div className="user-info mb-6 has-text-centered">
        <div className={(lastOnline === 0 && !isTheSameUser) ? "user-avatar-big-container is-online" : "user-avatar-big-container"}>
            {isLoading
                ? <Skeleton circle={true} height={"100%"} width={"100%"} />
                : <img src={`/${avatar}`} />
            }
        </div>
        <Heading type={1}>{isLoading ? <Skeleton width={"60%"} /> : fullName}</Heading>
        <Heading type={4}>{isLoading ? <Skeleton width={"60%"} /> : `@${userName}`}</Heading>
        {isLoading
            ? <Skeleton width={"30%"} />
            : (!isTheSameUser && lastOnline !== null) &&
                <time dateTime={lastOnline as string}>
                    {lastOnline
                        ? lastOnline === 0
                            ? null
                            : `Last seen online: ${timer.getNormalizedDateTime(lastOnline)}`
                        : "Now online"
                    }
                </time>
        }
        {isLoading ? <div style={{ textAlign: "center" }}><Skeleton height={40} width={"30%"} /></div> :
            isTheSameUser
                ? null
                : friendshipStatusWithRequester?.status === EFriendshipStatus.FRIENDS
                    ? <div className="mt-4">
                        <button className="button is-danger is-outlined" onClick={() => handleCancelFriendship(friendshipStatusWithRequester.fshipId)}>
                            {`Unfriend ${fullName}`}
                        </button>
                    </div>
                    : friendshipStatusWithRequester?.status === EFriendshipStatus.PENDING
                        ? friendshipStatusWithRequester?.initiatorId === auth._id
                            ? <div className="mt-4">
                                <button className="button is-danger is-outlined" onClick={() => handleWithdrawFriendRequest(friendshipStatusWithRequester.fshipId)}>
                                    {`Cancel Friend Request`}
                                </button>
                            </div>
                            : <React.Fragment>
                                <div className="mt-4">
                                    <button className="button is-primary is-outlined" onClick={() => handleAcceptFriendRequest(friendshipStatusWithRequester.fshipId)}>
                                        {`Accept Friend Request`}
                                    </button>
                                </div>
                                <div className="mt-4">
                                    <button className="button is-danger is-outlined" onClick={() => handleRejectFriendRequest(friendshipStatusWithRequester.fshipId)}>
                                        {`Reject Friend Request`}
                                    </button>
                                </div>
                            </React.Fragment>
                        : <div className="mt-4">
                            <button className="button is-success is-outlined" onClick={() => handleSendFriendRequest(userName)}>
                                {`Befriend ${fullName}`}
                            </button>
                        </div>
        }
        {isLoading ? <Skeleton width={"30%"} /> : !isTheSameUser && <div className="mt-4">
            <button className="button is-primary is-outlined" onClick={() => handleSendMessage(userName)}>
                Message
            </button>
        </div>}
    </div>);
};

export default UserInfo;