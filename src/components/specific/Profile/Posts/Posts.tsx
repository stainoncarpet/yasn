import React from 'react';

import timer from '../../../../helpers/timer';
import "./Posts.scss"
import Post from './Post/Post';

const Posts = ({posts, userName}) =>
    <div className="feed mt-4">
        {posts.length === 0 
        ? <p>{userName} has not posted anything.</p>
        : posts.map((post) => <Post post={post} timeDifference={timer.calculateTimeDifference(post.dateOfPublication)} key={post._id + "-by-" + post.author._id} /> )}
    </div>
;

export default Posts;