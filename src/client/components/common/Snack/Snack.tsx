import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import miscSlice from '../../../redux/slices/misc/misc';
import "./Snack.scss";
import { IMiscSlice } from '../../../interfaces/state/i-misc-slice';

const Snack = () => {
    const dispatch = useDispatch();
    const {isShown, content, type} = useSelector((state: any) => state.misc.snackbar);

    const toggleSnackbar = () => { dispatch(miscSlice.actions.toggleSnackbar({})); };

    return (
        <article className={`message is-${type.toLowerCase()} snack`}>
            <div className="message-header">
                <p>{type.toUpperCase()}</p>
                <button className="delete" aria-label="delete" onClick={toggleSnackbar} />
            </div>
            <div className="message-body">
                {content}
            </div>
        </article>
    );
};

export default Snack;
