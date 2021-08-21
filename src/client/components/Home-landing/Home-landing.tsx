import React from 'react';
import { useDispatch } from 'react-redux';

import "./Home-landing.scss";

import Heading from '../common/Heading/Heading';
import miscSlice from '../../redux/slices/misc/misc';
import LoginForm from '../Login-form/Login-form';
import useDisableOverflow from '../../custom-hooks/use-disable-overflow';

const HomeLanding = () => {
    const togglePortal = miscSlice.actions.togglePortal;

    const dispatch = useDispatch();

    useDisableOverflow();

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
                    </div>
                </div>
            </div>
            
        </section>
    );
};

export default HomeLanding;