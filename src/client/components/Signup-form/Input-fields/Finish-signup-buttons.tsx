import React from 'react';

const FinishSignupButtons = ({isSubmittable, handleSubmit}) => {
   
    return (
        <div className="field is-grouped">
            <div className="control">
                <button 
                    className={`button is-success${false ? " is-loading" : ""}`} 
                    onClick={handleSubmit} 
                    disabled={!isSubmittable}
                > 
                    Submit 
                </button>
            </div>
            <div className="control">
                <button className="button is-link is-light">Cancel</button>
            </div>
        </div>
    );
};

export default FinishSignupButtons;