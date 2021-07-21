//@ts-ignore
import React from  "react";
import {useQuery, useMutation} from "@apollo/client";

import UserContext from '../../data/context/User-context';
import Posts from "./Posts/Posts";
import WritePost from "./Posts/Write-post/Write-post";
import Heading1 from "../common/Heading1/Heading1";
import { CREATE_POST } from "../../data/apollo/mutations/create-post";
import { GET_POSTS } from "../../data/apollo/queries/get-posts";
import FriendsListMini from "../Friends-list-mini/Friends-list-mini";

const Profile = (props) => {
    const [postTitle, setPostTitle] = React.useState("");
    const [postContent, setPostContent] = React.useState("");
    const [isCreateNewPostShown, toggleCreateNewPost] = React.useState(false);

    const {state} = React.useContext<any>(UserContext);
    const { loading, error, data } = useQuery(GET_POSTS, { fetchPolicy: "no-cache" });
    const [createPost, {loading: loading2, error: error2}] = useMutation(CREATE_POST);
    
    const handleSetPostTitle = React.useCallback((e) => setPostTitle(e.target.value), [postTitle]);

    const handleSetPostContent= React.useCallback((e) => setPostContent(e.target.value), [postContent]);

    const handlePostSubmit = React.useCallback(async () => {
        const {data} = await createPost({variables: {authToken: state.user.token, postTitle: postTitle, postContent: postContent}});

        setPostTitle("");
        setPostContent("");
    }, [postTitle, postContent])

    const toggle = () => {
        toggleCreateNewPost(!isCreateNewPostShown);
    };

    return (
        <section className="section">
            <FriendsListMini />
            <Heading1>Discussions</Heading1>
            <h2 className="subtitle">Create yours or participate in others'</h2>
            <button className="button is-link is-light" onClick={toggle}>{isCreateNewPostShown ? "- Hide" : "+ New Post"}</button>
            {isCreateNewPostShown 
                && <WritePost 
                    postTitle={postTitle} 
                    postContent={postContent} 
                    setPostTitle={handleSetPostTitle} 
                    setPostContent={handleSetPostContent} 
                    handlePostSubmit={handlePostSubmit}
                />
            }
            {loading 
                ? <p>LOADING</p> 
                : error 
                    ? <p>ERROR</p>
                    : <Posts posts={data.posts} />
            }
        </section>
    );
};

export default Profile;