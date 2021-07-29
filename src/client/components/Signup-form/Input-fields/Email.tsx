import React from 'react';

const Email = (props) => {
    const {email, setEmail, isEmailAvailable} = props;

    const isEmailValid = !(!email.includes('@') && email.length > 4);

    return (
        <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left has-icons-right">
                    <input 
                        className={isEmailValid || !isEmailAvailable ? "input" : "input is-danger"} 
                        type="email" placeholder="Email" 
                        value={email} 
                        onChange={setEmail} 
                    />
                    <span className="icon is-small is-left"><i className="fas fa-envelope"></i></span>
                    <span className="icon is-small is-right"><i className="fas fa-exclamation-triangle"></i></span>
                </div>
                {(!isEmailValid) 
                ? <p className="help is-danger">This email is invalid</p>
                : isEmailAvailable 
                    ? <p className="help is-success">This email is available</p>
                    : <p className="help is-danger">This email is already taken</p>
            
            }
            </div>
    );
};

export default Email;
