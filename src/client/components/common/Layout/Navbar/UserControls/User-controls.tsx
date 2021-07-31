import React from 'react';
import {Link} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { logOut } from '../../../../../data/redux/slices/auth/thunks';

const UserControls = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.auth);
    
    const handleClick = async () => dispatch(logOut({id: user._id, token: user.token}));

    return (
        <div className="navbar-end">
            <div className="navbar-item">
            <Link to={`/profile/${user.userName.toLowerCase()}`}>
                    <figure className="image is-64x64">
                        <img 
                            className="is-rounded" 
                            src={user.avatar 
                                ? `http://localhost:3000/${user.avatar}` 
                                : "https://via.placeholder.com/64"} 
                            />
                    </figure>
                </Link>
            </div>
            <div className="navbar-item">
                <div className="buttons">
                    <button className="button is-light" onClick={handleClick}>Log out</button>
                </div>
            </div>
        </div>
    );
};

export default UserControls;
