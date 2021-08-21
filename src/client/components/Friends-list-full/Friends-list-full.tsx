import React, { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

import Heading from '../common/Heading/Heading';
import { getFriends } from '../../redux/slices/user/thunks';
import useFriendingFunctionality from '../../custom-hooks/use-friending-functionality';

import "./Friends-list-full.scss";

const FriendsListFull = () => {
    const friends = useSelector((state: any) => state.user.data.friends);
    const auth = useSelector((state: any) => state.auth);
    const { token, _id } = useSelector((state: any) => state.auth);

    const dispatch = useDispatch();

    const [_, handleWithdrawFriendRequest, handleCancelFriendship, handleAcceptFriendRequest, handleRejectFriendRequest] = useFriendingFunctionality();

    React.useEffect(() => { dispatch(getFriends({ token })); return () => { /* reset list */ }; }, []);

    const alreadyFriends: Array<ReactElement> = [];
    const pendingFriends: Array<ReactElement> = [];

    friends.array.forEach(({ user, friendshipStatus: { status, fshipId, initiatorId } }) => {
        const jsx = <div key={user._id} className="friends-list-item">
            <div className="stacked-info">
                    <figure className="image is-96x96">
                    <Link to={`/profile/${user.userName.toLowerCase()}`}>
                        <img className="is-rounded" src={`http://localhost:3000/${user.avatar}`} alt={`${user.fullName}'s avatar`} />
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
    });

    return (
        <section className="section">
            <Heading type={1}>Friends</Heading>
            <div className="friends-list-full mb-5">
                {friends.isLoading 
                    ? <React.Fragment><Skeleton height={138.5} /> <Skeleton height={138.5} /> </React.Fragment>
                    : alreadyFriends.length > 0
                        ? alreadyFriends
                        : <p>You have no friends</p>
                }
            </div>
            <Heading type={1}>Requests</Heading>
            <div className="friends-list-full">
                {friends.isLoading 
                    ? <React.Fragment><Skeleton height={138.5} /> <Skeleton height={138.5} /> </React.Fragment>
                    : pendingFriends.length > 0
                        ? pendingFriends
                        : <p>You have no pending requests</p>
                }
            </div>
        </section>
    );
};

export default FriendsListFull;