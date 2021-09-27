import React from 'react';
import ReactDOM from "react-dom";
import { useSelector } from 'react-redux';

import "./Portal.scss";
import useDisableOverflow from '../../../custom-hooks/use-disable-overflow';
import { EPortalComponent } from '../../../interfaces/state/i-misc-slice';
import { IStoreState } from '../../../interfaces/state/i-store-state';
import LoginForm from '../Login-form/Login-form';
import PasswordResetForm from '../Password-reset-form/Password-reset-form';

interface IProps {
    children?: React.ReactNode,
    component?: EPortalComponent
}

const Portal = ({ children }: IProps): React.ReactPortal | null => {
    const portal = useSelector((state: IStoreState) => state.misc.portal);
    const el = document.getElementById("portal");

    useDisableOverflow();

    let crust;

    if (portal.component === EPortalComponent.LOGINFORM) {
        crust = <React.Fragment>
            <div className="portal-background"></div>
            <div className="portal-contents">
                {<LoginForm />}
            </div>
        </React.Fragment>
    } else if (portal.component === EPortalComponent.NEWPOSTFORM) {
        crust = <React.Fragment>
            <div className="portal-background"></div>
            <div className="portal-contents">
                {<LoginForm />}
            </div>
        </React.Fragment>
    } else if (portal.component === EPortalComponent.SIGNUPFORM) {
        crust = <React.Fragment>
            <div className="portal-background"></div>
            <div className="portal-contents">
                {<LoginForm />}
            </div>
        </React.Fragment>
    } else if (portal.component === EPortalComponent.PASSWORDRESETFORM) {
        crust = <React.Fragment>
            <div className="portal-background"></div>
            <div className="portal-contents">
                {<PasswordResetForm />}
            </div>
        </React.Fragment>
    } else if ((portal.component === EPortalComponent.NONE)) {
        crust = <React.Fragment>
            <div className="portal-background"></div>
            <div className="portal-contents">
                {children}
            </div>
        </React.Fragment>
    }

    return el ? ReactDOM.createPortal(crust, el) : null
};

export default Portal;