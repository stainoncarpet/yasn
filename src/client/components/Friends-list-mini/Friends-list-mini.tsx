import React from 'react';

import "./Friends-list-mini.scss";

import Heading1 from '../common/Heading1/Heading1';


const FriendsListMini = () => {
    return (<React.Fragment><Heading1>Friends</Heading1><div className="friends-list-mini mb-6">
        {[1].map((el, ind) => <div className="friend" key={ind}>
            <div className="friend-avatar-container">
                <img src="https://via.placeholder.com/150" className="friend-avatar-image" />
            </div>
            <div className="friend-info">Ashton Kutcher</div>
        </div>
        )}
    </div></React.Fragment>)
};

export default FriendsListMini;
