import React from  "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import Posts from "./Posts/Posts";
import WritePost from "./Posts/Write-post/Write-post";
import Heading1 from "../common/Heading1/Heading1";
import FriendsListMini from "../Friends-list-mini/Friends-list-mini";
import postsSlice from "../../data/redux/slices/posts/posts";
import postsSocket from "../../data/sockets/posts-socket";

const Profile = (props) => {
    const [postTitle, setPostTitle] = React.useState("");
    const [postContent, setPostContent] = React.useState("");
    const [isCreateNewPostShown, toggleCreateNewPost] = React.useState(false);
    const {userName} = useParams<any>();

    const dispatch = useDispatch();

    const user = useSelector((state: any) => state.user);
    
    const handleSetPostTitle = React.useCallback((e) => setPostTitle(e.target.value), [postTitle]);

    const handleSetPostContent= React.useCallback((e) => setPostContent(e.target.value), [postContent]);

    const handlePostSubmit = React.useCallback(async () => {
        //@ts-ignore
        dispatch(postsSlice.actions["server/create/post"]({token: user.token, postTitle: postTitle, postContent: postContent }))

        setPostTitle("");
        setPostContent("");
    }, [postTitle, postContent]);

    const toggle = React.useCallback(() => toggleCreateNewPost(!isCreateNewPostShown), [isCreateNewPostShown]);

    React.useEffect(() => {postsSocket.emit("check-in-user-profile-room", {userName});}, [userName]);

    return (
        <section className="section">
            <FriendsListMini />
            <Heading1>Discussions</Heading1>
            <WritePost 
                    postTitle={postTitle} 
                    postContent={postContent} 
                    setPostTitle={handleSetPostTitle} 
                    setPostContent={handleSetPostContent} 
                    handlePostSubmit={handlePostSubmit}
                    isCreateNewPostShown={isCreateNewPostShown}
                    toggle={toggle}
                    showNewPostButton={user.userName.toLowerCase() === userName.toLowerCase()}
                />
            <Posts />
        </section>
    );
};

export default Profile;