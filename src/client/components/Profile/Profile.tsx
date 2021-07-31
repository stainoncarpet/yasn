import React from  "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import Posts from "./Posts/Posts";
import WritePost from "./Posts/Write-post/Write-post";
import Heading1 from "../common/Heading1/Heading1";
import FriendsListMini from "../Friends-list-mini/Friends-list-mini";
import postsSocket from "../../data/sockets/profile-socket";
import ProfileInfo from "./User-info/Profile-info";
import profileSlice from "../../data/redux/slices/profile/profile";
import { fetchProfile } from "../../data/redux/slices/profile/thunks";

const Profile = () => {
    const {userName} = useParams<any>();

    const auth = useSelector((state: any) => state.auth);
    const profile = useSelector((state: any) => state.profile)
    const dispatch = useDispatch();
    
    React.useEffect(() => {
        dispatch(fetchProfile({userName}))

        postsSocket.emit("check-in-user-profile-room", {userName});

        return () => { postsSocket.emit("check-in-user-profile-room", {userName: null}) };
    }, [userName]);

    const createPost = React.useCallback((postTitle, postContent) => {
        //@ts-ignore
        dispatch(profileSlice.actions["server/create/post"]({token: auth.token, postTitle: postTitle, postContent: postContent }));
    }, []);

    return (
        <section className="section">
            <ProfileInfo info={profile.userInfo} />
            <FriendsListMini friends={profile.friends} />
            <Heading1>Discussions</Heading1>
            <WritePost showNewPostButton={auth.userName.toLowerCase() === userName.toLowerCase()} createPost={createPost}/>
            <Posts posts={profile.posts} wallOwnership={userName === auth.userName ? "Your Wall" : `${userName}'s Wall`} />
        </section>
    );
};

export default Profile;