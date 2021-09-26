import React from 'react';

const Password = (props) => {
    const {password, setPassword, isPasswordValid, isPasswordLongEnough} = props;

    return (
        <div className="field">
                <label className="label">Password</label>
                <div className="control has-icons-left has-icons-right">
                    <input 
                        className={
                            !isPasswordLongEnough 
                                ? "input"
                                : isPasswordValid 
                                    ? "input is-success"
                                    : "input is-danger"
                        } 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={setPassword} 
                        autoComplete="off"
                    />
                    <span className="icon is-small is-left">
                        <i className="fas fa-key"></i>
                    </span>
                    {isPasswordValid && isPasswordLongEnough 
                        ? <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span>
                        : <span className="icon is-small is-right">
                            <i className="fas fa-exclamation-triangle"></i>
                        </span>
                    }
                </div>
                {(!isPasswordValid && isPasswordLongEnough) && <p className="help is-danger">This password is not good enough</p>}
            </div>
    );
};

export default React.memo(Password);
