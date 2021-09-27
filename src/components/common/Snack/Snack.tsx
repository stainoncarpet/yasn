import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import miscSlice from '../../../redux/slices/misc/misc';
import "./Snack.scss";
import { IStoreState } from '../../../interfaces/state/i-store-state';

const Snack = () => {
    const dispatch = useDispatch();
    const { isShown, content, type } = useSelector((state: IStoreState) => state.misc.snackbar);

    const toggleSnackbar = () => { dispatch(miscSlice.actions.toggleSnackbar({})); };

    return (<div className={`notification is-${type.toLowerCase()} snack`}>
                <button className="delete" aria-label="delete" onClick={toggleSnackbar}></button>
                {content}
            </div>);
};

export default Snack;