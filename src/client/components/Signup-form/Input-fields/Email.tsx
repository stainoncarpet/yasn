import React, { SyntheticEvent } from 'react';

interface IProps {
    email: string, 
    setEmail: (e: SyntheticEvent) => void, 
    isEmailAvailable: boolean, 
    isCheckingEmailLoading: boolean, 
    isEmailValid: boolean, 
    isEmailTooShort: boolean, 
    alreadyUsedEmail?: string
}

const Email = ({ email, setEmail, isEmailAvailable, isCheckingEmailLoading, isEmailValid, isEmailTooShort, alreadyUsedEmail }: IProps) => {
    const isEmailUnchanged = alreadyUsedEmail && alreadyUsedEmail === email;

    let emailCheckClasses;

    if (isCheckingEmailLoading) {
        emailCheckClasses = "control has-icons-left has-icons-right is-loading";
    } else {
        emailCheckClasses = "control has-icons-left has-icons-right";
    }

    let emailInputClasses;

    if (isEmailTooShort || isEmailUnchanged) {
        emailInputClasses = "input";
    } else {
        if (isEmailValid) {
            if (isEmailAvailable) {
                emailInputClasses = "input is-success";
            } else {
                emailInputClasses = "input is-danger";
            }
        } else {
            emailInputClasses = "input is-danger";
        }
    } 

    let iconJSX;

    if(!isEmailTooShort && !isEmailUnchanged) {
        if(!isCheckingEmailLoading && isEmailValid && isEmailAvailable) {
            iconJSX = <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
            </span>;
        } else {
            iconJSX = <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle"></i>
            </span>;
        }
    }

    let hintJSX;

    if(!isEmailTooShort && isEmailValid && !isEmailUnchanged) {
        if(isEmailAvailable) {
            hintJSX = <p className="help is-success">This email is available</p>;
        } else {
            hintJSX = <p className="help is-danger">This email is already taken</p>;
        }
    } else if (!isEmailTooShort && isEmailValid && isEmailUnchanged) {
        hintJSX = <p className="help">Your current email</p>;
    } else if(!isEmailTooShort) {
        hintJSX = <p className="help is-danger">Invalid email</p>;
    }

    return (<div className="field">
        <label className="label">Email</label>
        <div className={emailCheckClasses}>
            <input
                className={emailInputClasses}
                type="email"
                placeholder="Email"
                value={email}
                onChange={setEmail}
                autoComplete="off"
            />
            <span className="icon is-small is-left"><i className="fas fa-envelope"></i></span>
            {iconJSX}
        </div>
        {hintJSX}
    </div>);
};

export default Email;
