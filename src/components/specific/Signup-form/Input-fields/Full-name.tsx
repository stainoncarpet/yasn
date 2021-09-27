import React from 'react';

const FullName = (props) => {
    const {fullName, setFullName} = props;

    return (
        <div className="field">
                <label className="label">Full Name</label>
                <div className="control has-icons-left">
                    <input 
                        className="input" 
                        type="text" 
                        placeholder="Full Name" 
                        value={fullName} 
                        onChange={setFullName} 
                    />
                    <span className="icon is-small is-left"> <i className="fas fa-user"></i> </span>
                </div>
            </div>
    );
};

export default FullName;
