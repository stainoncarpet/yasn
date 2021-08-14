import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import "./Home-landing.scss";

import Heading from '../common/Heading/Heading';
import { logIn } from '../../data/redux/slices/auth/thunks';
import portalSlice from '../../data/redux/slices/portal/portal';
import Portal from '../Portal/Portal';
import SignupForm from '../Signup-form/Signup-form';
import LoginForm from '../Login-form/Login-form';

const HomeLanding = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const togglePortal = portalSlice.actions.togglePortal;
    const isShown = useSelector((state: any) => state.portal.isShown);

    const dispatch = useDispatch();

    return (
        <section className="home-landing" >
            <div className="background"></div>
            <div className="container is-fullhd">
                <div className="greeting-message">
                    <Heading type={1}>Welcome to YASN!</Heading>
                    <Heading type={2}>Yet Another Social Network where you can express yourself without bigtech limitations.</Heading>
                </div>
                <div className="auth-boxes">
                    <div className="login-box">
                        <Heading type={3} isCentered={true}>Log in</Heading>
                        <LoginForm />
                    </div>
                    <hr className="mt-6" />
                    <div className="signup-box">
                        <Heading type={3} isCentered={true}>Or sign up here</Heading>
                        <a className="button is-success" onClick={() => dispatch(togglePortal({}))}> Sign Up </a>
                        {isShown && <Portal><SignupForm /></Portal>}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeLanding;