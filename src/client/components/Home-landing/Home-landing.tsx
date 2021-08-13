import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import "./Home-landing.scss";

import Heading from '../common/Heading/Heading';
import { logIn } from '../../data/redux/slices/auth/thunks';

const HomeLanding = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const dispatch = useDispatch();

    const handleLogin = async () => dispatch(logIn({ email, password }));

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
                        <div className="field">
                            <Heading type={3} isCentered={true}>Log in</Heading>
                            <p className="control has-icons-left has-icons-right">
                                <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-envelope" />
                                </span>
                                <span className="icon is-small is-right">
                                    <i className="fas fa-check" />
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left">
                                <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-lock" />
                                </span>
                            </p>
                        </div>
                        <button className="button is-info mt-3" onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                    <hr />
                    <div className="signup-box">
                        <Heading type={3} isCentered={true}>Or sign up here</Heading>
                        <Link to="/signup" className="button is-success">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeLanding;