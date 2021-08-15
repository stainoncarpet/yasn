import React from  "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import Posts from "./Posts/Posts";
import WritePost from "./Posts/Write-post-form/Write-post-form";
import Heading from "../common/Heading/Heading";
import FriendsListMini from "../Friends-list-mini/Friends-list-mini";
import ProfileInfo from "./User-info/User-info";
import profileSlice from "../../data/redux/slices/profile/profile";
import { fetchProfile } from "../../data/redux/slices/profile/thunks";
import {profileSocket} from "../../data/redux/configure-store";
import Portal from "../Portal/Portal";
import portalSlice from "../../data/redux/slices/portal/portal";

const Profile = () => {
    const {userName} = useParams<any>();
    const dispatch = useDispatch();

    const auth = useSelector((state: any) => state.auth);
    const profile = useSelector((state: any) => state.profile);
    const isPortalShown = useSelector((state: any) => state.portal.isShown);

    const createPost = profileSlice.actions["server/create/post"];
    const resetProfile = profileSlice.actions["resetProfileData"];
    
    React.useEffect(() => {
        dispatch(fetchProfile({userName, requesterId: auth._id}))

        profileSocket.emit("check-in-user-profile-room", {userName});

        return () => { 
            //profileSocket.emit("check-out-user-profile-room", {userName});
            dispatch(resetProfile());
        };

    }, [userName]);

    const hadleCreatePost = React.useCallback((postTitle, postContent) => {
        //@ts-ignore
        dispatch(createPost({token: auth.token, postTitle: postTitle, postContent: postContent }));
    }, []);

    const handleCancelForm = React.useCallback(() => dispatch(portalSlice.actions.togglePortal({})), []);

    return (
        <section className="section">
            <ProfileInfo info={profile.userInfo} auth={auth} isLoading={profile.isLoading} />
            <FriendsListMini friends={profile.friends.selection} />
            <Heading type={2}>
                {userName.toLowerCase() === auth.userName.toLowerCase() ? "Your Wall" : `${profile.userInfo.userName}'s Wall`}
                <button className="button is-link is-light ml-3" onClick={() => dispatch(portalSlice.actions.togglePortal({}))}>+ New Post</button>
            </Heading>
            {isPortalShown && <Portal><WritePost createPost={hadleCreatePost} cancel={handleCancelForm}/></Portal>}
            <Posts posts={profile.posts} userName={profile.userInfo.userName} />
        </section>
    );
};

export default Profile;