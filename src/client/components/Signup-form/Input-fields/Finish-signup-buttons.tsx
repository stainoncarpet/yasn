import React from 'react';

import { useDispatch } from 'react-redux';
import portalSlice from '../../../data/redux/slices/portal/portal';

const FinishSignupButtons = ({isSubmittable, handleSubmit}) => {
    const togglePortal = portalSlice.actions.togglePortal;

    const dispatch = useDispatch();
   
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
            <div className="control" onClick={() => dispatch(togglePortal({}))}>
                <button className="button is-link is-light">Cancel</button>
            </div>
        </div>
    );
};

export default FinishSignupButtons;