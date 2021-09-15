import React from 'react';
import { useDispatch } from 'react-redux';

import "./Password-reset-form.scss";

import Heading from "../common/Heading/Heading";
import miscSlice from '../../redux/slices/misc/misc';
import myValidator from '../../helpers/validator';
import { resetPassword, setNewPassword } from '../../redux/slices/auth/thunks';

const PasswordResetForm = () => {
    //@ts-ignore - set at webpack build time
    const timeLimit = PASSWORD_RESET_ACTION_LIFESPAN;

    const emailRef = React.useRef<HTMLInputElement | null>(null);

    const [resetActionId, setResetActionId] = React.useState(null);

    const [seconds, setSeconds] = React.useState(timeLimit);
    const intervalRef = React.useRef<number | undefined>(undefined);

    const [email, setEmail] = React.useState("b0mb3rm4n1@yahoo.com");
    const [isConfirmed, setIsConfirmed] = React.useState(false);
    const [newPassword1, setNewPassword1] = React.useState("");
    const [newPassword2, setNewPassword2] = React.useState("");
    const [securityCode, setSecurityCode] = React.useState("");

    const togglePortal = miscSlice.actions.togglePortal;
    const dispatch = useDispatch()

    React.useEffect(() => { 
        emailRef.current!.focus();

        return () => {
            if(intervalRef.current) clearTimeout(intervalRef.current);
        };
    }, []);

    const handleStartReset = async () => {
        const res: any = await dispatch(resetPassword({ email }));

        if (res.payload.msg === "OK") {
            setResetActionId(res.payload.resetActionId);
            setIsConfirmed(true);
            startCountDown(seconds);
        }
    };

    const startCountDown = (s) => {
        if (s > 0) {
            intervalRef.current = setTimeout(() => {
                setSeconds(s - 1);
                startCountDown(s - 1);
            }, 1000);
        } else {
            clearTimeout(intervalRef.current);
            intervalRef.current = undefined;
            setResetActionId(null);
            setSeconds(timeLimit);
        }
    };

    if (!isConfirmed) {
        return (<section className="section password-reset">
            <Heading type={1}>Password Reset</Heading>
            <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input className="input" type="email" placeholder="Email" ref={emailRef} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <span className="icon is-small is-left">
                        <i className="fas fa-envelope" />
                    </span>
                    <span className="icon is-small is-right"><i className="fas fa-check" /> </span>
                </p>
            </div>
            <div className="control">
                <button className="button is-info mt-2 mr-2" onClick={handleStartReset} disabled={!myValidator.validateEmail(email)}>Reset</button>
                <button className="button is-link is-light mt-2" onClick={() => dispatch(togglePortal({}))}>Cancel</button>
            </div>
        </section>)
    } else {
        return <section className="section password-reset">
            <Heading type={1}>Password Reset</Heading>
            <React.Fragment>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control has-icons-left has-icons-right">
                        <input
                            className="input"
                            type="password"
                            placeholder="Password"
                            value={newPassword1}
                            onChange={(e) => setNewPassword1(e.target.value)}
                            autoComplete="off"
                        />
                        <span className="icon is-small is-left"> <i className="fas fa-key"></i></span>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Re-type Password</label>
                    <div className="control has-icons-left has-icons-right">
                        <input
                            className="input"
                            type="password"
                            placeholder="Password"
                            value={newPassword2}
                            onChange={(e) => setNewPassword2(e.target.value)}
                            autoComplete="off"
                        />
                        <span className="icon is-small is-left"><i className="fas fa-key"></i></span>
                    </div>
                </div>
                {resetActionId && <div className="field">
                    <label className="label">Security code</label>
                    <div className="control has-icons-left has-icons-right">
                        <input
                            className="input"
                            type="text"
                            placeholder="Security code"
                            value={securityCode}
                            onChange={(e) => setSecurityCode(e.target.value)}
                            autoComplete="off"
                        />
                        <span className="icon is-small is-left"><i className="fas fa-lock-open"></i></span>
                    </div>
                </div>}
            </React.Fragment>
            <p>{resetActionId ? `Code expires in ${seconds} seconds` : `Code expired`}</p>
            <div className="control">
                {seconds > 0 && resetActionId
                    ? <button
                        className="button is-success mt-2 mr-2"
                        onClick={() => dispatch(setNewPassword({email: email, password: newPassword1, code: securityCode, resetActionId }))}
                        disabled={!myValidator.validatePasswords(newPassword1, newPassword2) || securityCode.length !== 6}>
                        Finish
                    </button>
                    : <button
                        className="button is-info mt-2 mr-2"
                        onClick={handleStartReset}
                        disabled={!myValidator.validateEmail(email)}>
                        Resend Code
                    </button>
                }
                <button className="button is-link is-light mt-2" onClick={() => dispatch(togglePortal({}))}>Cancel</button>
            </div>
        </section>
    }
};

export default PasswordResetForm;