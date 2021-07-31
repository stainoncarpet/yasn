import React from 'react';

import timer from '../../../helpers/timer';
import "./Posts.scss"
import Post from './Post/Post';

const Posts = ({posts, wallOwnership}) =>
    <div className="feed mt-4">
        <h3 className="subtitle is-3">{wallOwnership}</h3>
        {posts.map((post) => <Post post={post} timeDifference={timer.calculateTimeDifference(post.dateOfPublication)} key={post._id + "-by-" + post.author._id} /> )}
    </div>
;

export default Posts;