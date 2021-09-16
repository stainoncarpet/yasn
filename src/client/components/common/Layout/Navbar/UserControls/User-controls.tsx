import React from 'react';
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux';

import Heading from '../../../Heading/Heading';
import { IStoreState } from '../../../../../interfaces/state/i-store-state';

import "./User-controls.scss";

//@ts-ignore
const app_address = APP_ADDRESS;

const UserControls = () => {
    const auth = useSelector((state: IStoreState) => state.auth);

    return (
        <div className="navbar-end">
            <div className="navbar-item">
            <Link to={`/profile/${auth?.userName?.toLowerCase()}`} className="avatar-button">
                    <figure className="image is-96x96">
                        <img 
                            className="is-rounded" 
                            src={auth.avatar 
                                ? `${app_address}/${auth.avatar}` 
                                : "https://via.placeholder.com/64"}
                        />
                    </figure>
                    <Heading type={4}>{auth.userName}</Heading>
                </Link>
            </div>

        </div>
    );
};

export default UserControls;
