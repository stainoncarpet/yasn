import React from 'react';

import { useDispatch } from 'react-redux';
import miscSlice from '../../../redux/slices/misc/misc';

const FinishSignupButtons = ({isSubmittable, handleSubmit}) => {
    const togglePortal = miscSlice.actions.togglePortal;

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
            <div className="control">
                <button className="button is-link is-light" onClick={() => dispatch(togglePortal({}))}>Cancel</button>
            </div>
        </div>
    );
};

export default FinishSignupButtons;