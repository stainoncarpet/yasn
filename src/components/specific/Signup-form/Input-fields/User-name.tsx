import React, { SyntheticEvent } from 'react';

interface IProps {
    handleUserNameChange: (e: SyntheticEvent) => void,
    userNameCheckLoading: boolean,
    userName: string,
    isUserNameAvailable: boolean,
    isUsernameTooShort: boolean,
    alreadyUsedUserName?: string
}

const UserName = ({ handleUserNameChange, userNameCheckLoading, userName, isUserNameAvailable, isUsernameTooShort, alreadyUsedUserName }: IProps) => {
    let userNameClasses, inputClasses;
    const isUserNameUnchanged = alreadyUsedUserName && alreadyUsedUserName === userName;
    let hintJSX: JSX.Element | null = null;
    let iconJSX: JSX.Element | null = null;

    if (userNameCheckLoading) {
        userNameClasses = "control has-icons-left has-icons-right is-loading";
    } else {
        userNameClasses = "control has-icons-left has-icons-right";
    }

    if (isUsernameTooShort || isUserNameUnchanged) {
        inputClasses = "input";
    } else {
        if (isUserNameAvailable || isUserNameUnchanged) {
            inputClasses = "input is-success";
        } else {
            inputClasses = "input is-danger";
        }
    }

    if (!isUsernameTooShort) {
        if (isUserNameUnchanged) {
            hintJSX = <p className="help">Your current username</p>;
        } else {
            if (isUserNameAvailable) {
                hintJSX = <p className="help is-success">This username is available</p>;
            } else {
                hintJSX = <p className="help is-danger">This username is not available</p>;
            }
        }
    }

    if (!isUsernameTooShort && !userNameCheckLoading && !isUserNameUnchanged) {
        iconJSX = <span className="icon is-small is-right">
            <i className="fas fa-check"></i>
        </span>;
    } else if (!userNameCheckLoading && !isUserNameAvailable && userName.length > 1 && !isUserNameUnchanged) {
        iconJSX = <span className="icon is-small is-right">
            <i className="fas fa-exclamation-triangle"></i>
        </span>;
    }

    return <div className="field">
        <label className="label">User Name</label>
        <div className={userNameClasses}>
            <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={handleUserNameChange}
                autoComplete="off"
                className={inputClasses} />
            <span className="icon is-small is-left"><i className="fas fa-user"></i></span>
            {iconJSX}
        </div>
        {hintJSX}
    </div>
};

export default React.memo(UserName);