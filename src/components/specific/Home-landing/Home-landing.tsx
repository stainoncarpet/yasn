import React from 'react';
import { useDispatch } from 'react-redux';

import "./Home-landing.scss";

import Heading from '../../common/Heading/Heading';
import miscSlice from '../../../redux/slices/misc/misc';
import LoginForm from '../Login-form/Login-form';
import useDisableOverflow from '../../../custom-hooks/use-disable-overflow';

const HomeLanding = () => {
    const [content, setContent] = React.useState("");
    const togglePortal = miscSlice.actions.togglePortal;

    const dispatch = useDispatch();

    useDisableOverflow();

    const sentence = "Yet another social network where you can express yourself. Without limitations.";
    const delayMultiplier = 100;

    React.useEffect(() => {
        let timeouts = new Array();

        for (let index = 0; index < sentence.length; index++) {
            timeouts.push(setTimeout(() => {
                setContent(sentence.substring(0, index + 1));
            }, delayMultiplier * index));
        }

        return () => {
            for (let i = 0; i < timeouts.length; i++) {
                if(timeouts[i])  clearTimeout(timeouts[i]);
            }
        };
    }, []);

    return (<section className="home-landing" >
            <div className="background"></div>
            <div className="container is-fullhd">
                <div className="greeting-message">
                    <Heading type={1}>Welcome to YASN!</Heading>
                    <Heading type={2}>
                        {content}
                        <span 
                            className="cursor" 
                            style={{animation: "blink 1s linear infinite", animationDelay: (sentence.length * delayMultiplier) + "ms"}}>
                        </span>
                    </Heading>
                </div>
                <div className="auth-boxes">
                    <div className="login-box">
                        <Heading type={2} isCentered={true}>Log in</Heading>
                        <LoginForm />
                    </div>
                    <hr className="mt-5" />
                    <div className="signup-box">
                        <Heading type={2} isCentered={true}>Or sign up here</Heading>
                        <a className="button is-success" onClick={() => dispatch(togglePortal({}))}>Sign Up</a>
                    </div>
                </div>
            </div>
        </section>);
};

export default HomeLanding;