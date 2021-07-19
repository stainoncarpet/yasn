import React from 'react';

const Password = (props) => {
    const {password, setPassword} = props;

    const isPasswordValid = !(password.length > 1 && password.length < 6);

    return (
        <div className="field">
                <label className="label">Password</label>
                <div className="control has-icons-left has-icons-right">
                    <input 
                        className={isPasswordValid ? "input" : "input is-danger"} 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={setPassword} 
                    />
                    <span className="icon is-small is-left">
                        <i className="fas fa-key"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fas fa-exclamation-triangle"></i>
                    </span>
                </div>
                {(!isPasswordValid) && <p className="help is-danger">This password is not good enough</p>}
            </div>
    );
};

export default Password;
