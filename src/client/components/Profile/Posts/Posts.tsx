import React from 'react';
import { useQuery, useSubscription } from '@apollo/client';

import timer from '../../../helpers/timer';
import "./Posts.scss"
import Post from './Post/Post';
import { GET_POSTS } from '../../../data/apollo/queries/get-posts';

import { ON_POST_VOTE_COUNTED } from '../../../data/apollo/subscriptions/vote-counted';

const Posts = () => {
    const { data: initialData, loading, error, refetch } = useQuery(GET_POSTS, { fetchPolicy: "network-only" });
    const { data: subscriptionData, loading: subscriptionLoading } = useSubscription(ON_POST_VOTE_COUNTED); 



    return loading 
    ? <p>LOADING</p> 
    : error 
        ? <p>ERROR</p>
        :( <div className="feed mt-4">
            <h3 className="subtitle is-3">Your Wall</h3>
            {subscriptionData ? `${subscriptionData.onPostVoteCounted.id}` : "NO SUBSCIPTION DATA"}
            {
                initialData && initialData.posts.map((post) => {
                    return <Post 
                        post={post}
                        likers={post.likers}
                        dislikers={post.dislikers}
                        timeDifference={timer.calculateTimeDifference(post.dateOfPublication)} 
                        key={post.id + "-by-" + post.author.id} 
                    />
                })
            }
        </div>
    );
};

export default Posts;