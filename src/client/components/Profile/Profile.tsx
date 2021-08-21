import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import Posts from "./Posts/Posts";
import Heading from "../common/Heading/Heading";
import FriendsListMini from "../Friends-list-mini/Friends-list-mini";
import ProfileInfo from "./User-info/User-info";
import profileSlice from "../../redux/slices/profile/profile";
import { fetchProfile } from "../../redux/slices/profile/thunks";
import { profileSocket } from "../../redux/configure-store";
import miscSlice from "../../redux/slices/misc/misc";

import "./Profile.scss";
import Skeleton from "react-loading-skeleton";

const Profile = () => {
    const { userName } = useParams<any>();
    const dispatch = useDispatch();

    const auth = useSelector((state: any) => state.auth);
    const profile = useSelector((state: any) => state.profile);

    const resetProfile = profileSlice.actions["resetProfileData"];

    React.useEffect(() => {
        dispatch(fetchProfile({ userName, requesterId: auth._id }))

        profileSocket.emit("check-in-user-profile-room", { userName });

        return () => {
            //profileSocket.emit("check-out-user-profile-room", {userName});
            dispatch(resetProfile({}));
        };

    }, [userName]);

    return (
        <section className="section">
            <ProfileInfo info={profile.userInfo} auth={auth} isLoading={profile.isLoading} />
            {/* Should scrap it
                <FriendsListMini isLoading={profile.isLoading} friends={profile.friends.selection} whoseFriends={userName.toLowerCase() === auth.userName.toLowerCase() ? "Your" : `${profile.userInfo.userName}'s`} />
            */}
            {profile.isLoading
                ? <React.Fragment>
                    <Skeleton height={64} />
                    <Skeleton height={32} />
                </React.Fragment>
                : <React.Fragment>
                    <Heading type={2}>
                        {userName.toLowerCase() === auth.userName.toLowerCase() ? "Your Wall" : `${profile.userInfo.userName}'s Wall`}
                        <button className="button new-post is-link is-light ml-3" onClick={() => dispatch(miscSlice.actions.togglePortal({}))}>+ New Post</button>
                    </Heading>
                    <Posts posts={profile.posts} userName={profile.userInfo.userName} />
                </React.Fragment>
            }
        </section>
    );
};

export default Profile;