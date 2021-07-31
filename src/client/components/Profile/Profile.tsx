import React from  "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import Posts from "./Posts/Posts";
import WritePost from "./Posts/Write-post/Write-post";
import Heading1 from "../common/Heading1/Heading1";
import FriendsListMini from "../Friends-list-mini/Friends-list-mini";
import postsSocket from "../../data/sockets/posts-socket";
import UserInfo from "./User-info/User-info";
import postsSlice from "../../data/redux/slices/posts/posts";

const profile = {
    profileInfo: null,
    friends: [],
    posts: []
}

const Profile = () => {
    const {userName} = useParams<any>();

    const user = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    
    React.useEffect(() => {
        postsSocket.emit("check-in-user-profile-room", {userName});

        return () => { postsSocket.emit("check-in-user-profile-room", {userName: null}) };
    }, [userName]);

    const createPost = React.useCallback((postTitle, postContent) => {
        //@ts-ignore
        dispatch(postsSlice.actions["server/create/post"]({token: user.token, postTitle: postTitle, postContent: postContent }));
    }, []);

    return (
        <section className="section">
            <UserInfo />
            <FriendsListMini />
            <Heading1>Discussions</Heading1>
            <WritePost showNewPostButton={user.userName.toLowerCase() === userName.toLowerCase()} createPost={createPost}/>
            <Posts />
        </section>
    );
};

export default Profile;