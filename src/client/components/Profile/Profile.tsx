import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import Posts from "./Posts/Posts";
import Heading from "../common/Heading/Heading";
import ProfileInfo from "./User-info/User-info";
import profileSlice from "../../redux/slices/profile/profile";
import { fetchProfile } from "../../redux/slices/profile/thunks";
import { profileSocket } from "../../redux/configure-store";
import miscSlice from "../../redux/slices/misc/misc";

import "./Profile.scss";
import Skeleton from "react-loading-skeleton";
import { IStoreState } from "../../interfaces/state/i-store-state";

const Profile = () => {
    const { userName } = useParams<any>();
    const dispatch = useDispatch();

    const auth = useSelector((state: IStoreState) => state.auth);
    const profile = useSelector((state: IStoreState) => state.profile);

    const resetProfile = profileSlice.actions["resetProfileData"];

    React.useEffect(() => {
        dispatch(fetchProfile({ userName, requesterId: auth._id }))

        profileSocket.emit("check-in-user-profile-room", { userName });

        return () => { dispatch(resetProfile({})) };

    }, [userName]);

    const isFriendsWithUser = profile.userInfo.friendshipStatusWithRequester && profile.userInfo.friendshipStatusWithRequester.status === "friends"
    const isSameUser = userName.toLowerCase() === auth.userName?.toLowerCase();

    return (<section className="section">
            <ProfileInfo info={profile.userInfo} auth={auth} isLoading={profile.isLoading} />
            {profile.isLoading
                ? <React.Fragment>
                    <Skeleton height={64} />
                    <Skeleton height={32} />
                </React.Fragment>
                : isFriendsWithUser || isSameUser
                    ? <React.Fragment>
                        <Heading type={2}>
                            {isSameUser
                                ? <React.Fragment>
                                    Your Wall 
                                    <button className="button new-post is-link is-light ml-3" onClick={() => dispatch(miscSlice.actions.togglePortal({}))}>
                                        + New Post
                                    </button>
                                </React.Fragment>
                                : `${profile.userInfo.userName}'s Wall`
                            }
                        </Heading>
                        <Posts posts={profile.posts} userName={profile.userInfo.userName} />
                    </React.Fragment>
                    : <p className="subtitle is-5 has-text-centered">Become friends to see each other's posts!</p>
            }
        </section>
    );
};

export default Profile;