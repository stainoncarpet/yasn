import React, { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

import Heading from '../../common/Heading/Heading';
import { getFriends } from '../../../redux/slices/user/thunks';
import useFriendingFunctionality from '../../../custom-hooks/use-friending-functionality';
import userSlice from '../../../redux/slices/user/user';

import "./Friends-list-full.scss";

import { IStoreState } from '../../../interfaces/state/i-store-state';

const FriendsListFull = () => {
    const friends = useSelector((state: IStoreState) => state.user.lists.friends);
    const auth = useSelector((state: IStoreState) => state.auth);
    const { token, _id } = useSelector((state: IStoreState) => state.auth);

    const dispatch = useDispatch();

    const [_, handleWithdrawFriendRequest, handleCancelFriendship, handleAcceptFriendRequest, handleRejectFriendRequest] = useFriendingFunctionality();

    React.useEffect(() => { dispatch(getFriends({ token })); return () => { dispatch(userSlice.actions.clearFriendsList({})); }; }, []);

    const alreadyFriends: Array<ReactElement> = [];
    const pendingFriends: Array<ReactElement> = [];

    for (let i = 0; i < friends.array.length; i++) {
        const { user, friendshipStatus: { status, fshipId, initiatorId } } = friends.array[i];

        const jsx = <div key={user._id} className="friends-list-item">
            <div className="stacked-info">
                <figure className="image is-96x96">
                    <Link to={`/profile/${user.userName.toLowerCase()}`}>
                        <img className="is-rounded" src={`/${user.avatar}`} alt={`${user.fullName}'s avatar`} />
                    </Link>
                </figure>
                <div className="names">
                    <Heading type={5}>{user.fullName}</Heading>
                    <Heading type={6}>@{user.userName}</Heading>
                </div>
            </div>
            <div className="stacked-buttons">
                {status === "friends"
                    ? <button className="button is-danger is-outlined" onClick={() => handleCancelFriendship(auth.token, fshipId)}>Unfriend</button>
                    : initiatorId === _id
                        ? <button className="button is-warning is-outlined" onClick={() => handleWithdrawFriendRequest(auth.token, fshipId)}>Withdraw</button>
                        : <React.Fragment>
                            <button className="button is-success is-outlined mb-2" onClick={() => handleAcceptFriendRequest(auth.token, fshipId)}>Accept</button>
                            <button className="button is-danger is-outlined" onClick={() => handleRejectFriendRequest(auth.token, fshipId)}>Reject</button>
                        </React.Fragment>
                }</div>
        </div>;
        status === "friends" ? alreadyFriends.push(jsx) : pendingFriends.push(jsx);
    }

    return (
        <section className="section">
            <Heading type={1}>Friends</Heading>
            <div className="friends-list-full mb-5">
                {friends.isLoading
                    ? new Array(4).fill("").map((_, i) => (
                        <div key={i} className="friends-list-item">
                            <div className="stacked-info" style={{display: "flex", justifyContent: "space-between"}}>
                                <figure className="image is-96x96">
                                    <Skeleton circle={true} width={96} height={96} />
                                </figure>
                                <Skeleton width={"50vw"} height={96} />
                            </div>
                        </div>
                    ))
                    : alreadyFriends.length > 0
                        ? alreadyFriends
                        : <p>You have no friends</p>
                }
            </div>
            {!friends.isLoading
                && pendingFriends.length > 0
                && <React.Fragment>
                    <Heading type={1}>Requests</Heading>
                    <div className="friends-list-full">
                        {pendingFriends}
                    </div>
                </React.Fragment>
            }
        </section>
    );
};

export default FriendsListFull;