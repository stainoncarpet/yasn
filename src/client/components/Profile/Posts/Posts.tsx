import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import timer from '../../../helpers/timer';
import "./Posts.scss"
import Post from './Post/Post';

import { fetchPosts } from '../../../data/redux/slices/posts/thunks';
import { RootState } from '../../../data/redux/configure-store';
import postsSlice from '../../../data/redux/slices/posts/posts';

const Posts = (props) => {
    const posts: any = useSelector<RootState>((state: any) => state.posts);
    const dispatch = useDispatch();
    const user: any = useSelector<RootState>((state: any) => state.user);

    const {userName} = useParams<any>();
  
    React.useEffect(() => {
        //@ts-ignore
        dispatch(fetchPosts({userName: userName}));
        return () => {dispatch(postsSlice.actions.resetPosts())};
    }, [userName]);

    return <div className="feed mt-4">
        <h3 className="subtitle is-3">{userName === user.userName ? "Your Wall" : `${userName}'s Wall`}</h3>
        {
            posts.map((post) => {
                return <Post
                    post={post}
                    timeDifference={timer.calculateTimeDifference(post.dateOfPublication)}
                    key={post._id + "-by-" + post.author._id}
                />
            })
        }
    </div>
};

export default Posts;