import React from 'react';
import {Link} from "react-router-dom";
import {useMutation} from "@apollo/client"

import UserContext from '../../../../../data/context/User-context';
import removeAuth from '../../../../../data/context/action-creators/remove-auth';
import { LOGOUT_USER } from '../../../../../data/apollo/mutations/logout-user'; 

const UserControls = () => {
    const {state, dispatch} = React.useContext<any>(UserContext);
    const [logoutUser, {loading, error}] = useMutation(LOGOUT_USER);

    const handleClick = async () => {
        const {data} = await logoutUser({variables: {id: state.user.id, authToken: state.user.token}});

        if(data.logoutUser) {
            dispatch(removeAuth());
        } else {
            console.log("failed to remove auth");
        }
        
    };

    return (
        <div className="navbar-end">
            <div className="navbar-item">
                <Link to={`/profile/${state.user.id}`}>
                    <figure className="image is-64x64">
                        <img className="is-rounded" src={state.user.avatar ? `http://localhost:3000/${state.user.avatar}` : "https://via.placeholder.com/64"} />
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
