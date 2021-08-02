import React from  "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import Posts from "./Posts/Posts";
import WritePost from "./Posts/Write-post/Write-post";
import Heading1 from "../common/Heading1/Heading1";
import FriendsListMini from "../Friends-list-mini/Friends-list-mini";
import ProfileInfo from "./User-info/User-info";
import profileSlice from "../../data/redux/slices/profile/profile";
import { fetchProfile } from "../../data/redux/slices/profile/thunks";
import {profileSocket} from "../../data/redux/configure-store";

const Profile = () => {
    const {userName} = useParams<any>();
    const dispatch = useDispatch();

    const auth = useSelector((state: any) => state.auth);
    const profile = useSelector((state: any) => state.profile)

    const createPost = profileSlice.actions["server/create/post"];
    const resetProfile = profileSlice.actions["resetProfileData"];
    
    React.useEffect(() => {
        dispatch(fetchProfile({userName, requesterId: auth._id}))

        profileSocket.emit("check-in-user-profile-room", {userName});

        return () => { 
            //profileSocket.emit("check-out-user-profile-room", {userName});
            resetProfile();
        };

    }, [userName]);

    const hadleCreatePost = React.useCallback((postTitle, postContent) => {
        //@ts-ignore
        dispatch(createPost({token: auth.token, postTitle: postTitle, postContent: postContent }));
    }, []);

    return (
        <section className="section">
            <ProfileInfo info={profile.userInfo} auth={auth} />
            <FriendsListMini friends={profile.friends.selection} pageOwnerUserName={profile.userInfo.userName} />
            <Heading1>Discussions</Heading1>
            <WritePost showNewPostButton={auth.userName.toLowerCase() === userName.toLowerCase()} createPost={hadleCreatePost}/>
            <Posts posts={profile.posts} wallOwnership={userName === auth.userName ? "Your Wall" : `${userName}'s Wall`} />
        </section>
    );
};

export default Profile;