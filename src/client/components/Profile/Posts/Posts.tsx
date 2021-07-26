import React from 'react';

import timer from '../../../helpers/timer';
import "./Posts.scss"
import Post from './Post/Post';

import { fetchPosts } from '../../../data/redux/slices/posts/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../data/redux/configure-store';
import { establishPostsSocketConnection } from '../../../data/sockets/posts-socket';

const Posts = (props) => { 
    const posts: any = useSelector<RootState>((state) => state.posts);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchPosts());
        //establishPostsSocketConnection();
    }, []);

    return <div className="feed mt-4">
                <h3 className="subtitle is-3">Your Wall</h3>
                {
                    posts.map((post) => {
                        return <Post
                            post={post}
                            likers={post.likers}
                            dislikers={post.dislikers}
                            timeDifference={timer.calculateTimeDifference(post.dateOfPublication)}
                            key={post._id + "-by-" + post.author._id}
                        />
                    })
                }
            </div>
};

export default Posts;