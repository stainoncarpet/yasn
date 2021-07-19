import React from 'react';

import timer from '../../../helpers/timer';
import "./Posts.scss"
import Post from './Post/Post';

const hardcodedPostWithComments = (
<article className="media">
    <figure className="media-left">
        <p className="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png" />
        </p>
    </figure>
    <div className="media-content">
        <div className="content">
            <p>
                <strong>Barbara Middleton</strong>
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta eros lacus, nec ultricies elit blandit non. Suspendisse pellentesque mauris sit amet dolor blandit rutrum. Nunc in tempus turpis.
                <br />
                <small><a>Like</a> · <a>Reply</a> · 3 hrs</small>
            </p>
        </div>

        <article className="media">
            <figure className="media-left">
                <p className="image is-48x48">
                    <img src="https://bulma.io/images/placeholders/96x96.png" />
                </p>
            </figure>
            <div className="media-content">
                <div className="content">
                    <p>
                        <strong>Sean Brown</strong>
                        <br />
                        Donec sollicitudin urna eget eros malesuada sagittis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam blandit nisl a nulla sagittis, a lobortis leo feugiat.
                        <br />
                        <small><a>Like</a> · <a>Reply</a> · 2 hrs</small>
                    </p>
                </div>
            </div>
        </article>

        <article className="media">
            <figure className="media-left">
                <p className="image is-48x48">
                    <img src="https://bulma.io/images/placeholders/96x96.png" />
                </p>
            </figure>
            <div className="media-content">
                <div className="content">
                    <p>
                        <strong>Kayli Eunice </strong>
                        <br />
                        Sed convallis scelerisque mauris, non pulvinar nunc mattis vel. Maecenas varius felis sit amet magna vestibulum euismod malesuada cursus libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus lacinia non nisl id feugiat.
                        <br />
                        <small><a>Like</a> · <a>Reply</a> · 2 hrs</small>
                    </p>
                </div>
            </div>
        </article>
    </div>
</article>);

const Posts = (props) => {
    const { posts } = props;

    return (
        <div className="feed mt-4">
            <h3 className="subtitle is-3">Your Feed</h3>
            {posts.map((post) => <Post post={post} timeDifference={timer.calculateTimeDifference(post.dateOfPublication)} key={post.id + "-by-" + post.author.id} />)}
        </div>
    );
};

export default React.memo(Posts);