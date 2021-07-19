import React from 'react';

const UserName = (props) => {
    const { handleUserNameChange, userNameCheckLoading, userName, isUserNameAvailable } = props;
    return (
        <div className="field">
            <label className="label">Username</label>
            <div className={
                userNameCheckLoading ? "control has-icons-left has-icons-right is-loading" : "control has-icons-left has-icons-right"
            }>
                <input type="text" placeholder="Username" value={userName} onChange={handleUserNameChange}
                    className={
                        userName.length < 3
                            ? "input"
                            : isUserNameAvailable
                                ? "input is-success"
                                : "input is-danger"} />
                <span className="icon is-small is-left"><i className="fas fa-user"></i></span>
                {userName.length > 2 && (!userNameCheckLoading && isUserNameAvailable)
                    ? (<span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                    </span>)
                    : (!userNameCheckLoading && !isUserNameAvailable)
                        ? (<span className="icon is-small is-right">
                            <i className="fas fa-exclamation-triangle"></i>
                        </span>)
                        : null
                }
            </div>
            {userName.length < 3
                ? null
                : isUserNameAvailable
                    ? <p className="help is-success">This username is available</p>
                    : <p className="help is-danger">This username is already taken</p>}
        </div>
    );
};

export default UserName;