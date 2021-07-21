import React from 'react';

import timer from '../../../helpers/timer';
import "./Posts.scss"
import Post from './Post/Post';

const Posts = (props) => {
    const { posts } = props;

    return (
        <div className="feed mt-4">
            <h3 className="subtitle is-3">Your Wall</h3>
            {posts.map((post) => <Post post={post} timeDifference={timer.calculateTimeDifference(post.dateOfPublication)} key={post.id + "-by-" + post.author.id} />)}
        </div>
    );
};

export default React.memo(Posts);