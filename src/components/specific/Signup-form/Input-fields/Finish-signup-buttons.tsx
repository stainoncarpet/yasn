import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import miscSlice from '../../../../redux/slices/misc/misc';
import { IStoreState } from '../../../../interfaces/state/i-store-state';

const FinishSignupButtons = ({isSubmittable, handleSubmit}) => {
    const auth = useSelector((state: IStoreState) => state.auth);
    const togglePortal = miscSlice.actions.togglePortal;

    const dispatch = useDispatch();
   
    return (
        <div className="field is-grouped">
            <div className="control">
                <button 
                    className={auth.isLoading ? "button is-success is-loading" : "button is-success"}
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