import React from 'react';

import myValidator from '../../../helpers/validator';

const Email = (props) => {
    const {email, setEmail, isEmailAvailable, isCheckingEmailLoading} = props;

    const isEmailValid = myValidator.validateEmail(email);

    const isEmailTooShort = email.length < 3;

    return (
        <div className="field">
                <label className="label">Email</label>
                <div className={
                    isCheckingEmailLoading 
                        ? "control has-icons-left has-icons-right is-loading" 
                        : "control has-icons-left has-icons-right"
                }>
                    <input 
                        className={
                            isEmailTooShort 
                                ? "input" 
                                : isEmailValid 
                                    ? isEmailAvailable
                                        ? "input is-success"
                                        : "input is-danger"
                                : "input is-danger"
                        } 
                        type="email" placeholder="Email" 
                        value={email} 
                        onChange={setEmail}
                        autoComplete="off" 
                    />
                    <span className="icon is-small is-left"><i className="fas fa-envelope"></i></span>
                    {isCheckingEmailLoading 
                        ? null 
                        : isEmailValid && isEmailAvailable
                        ? <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span>
                        : <span className="icon is-small is-right">
                            <i className="fas fa-exclamation-triangle"></i>
                        </span>
                    }
                </div>
                {isEmailTooShort
                    ? null
                    : isEmailValid 
                        ? isEmailAvailable 
                            ? <p className="help is-success">This email is available</p>
                            : <p className="help is-danger">This email is already taken</p>
                        : <p className="help is-danger">Invalid email</p>
                }
            </div>
    );
};

export default Email;
