import React from 'react';
import { useDispatch } from 'react-redux';

import miscSlice from '../../../redux/slices/misc/misc';
import "./Snack.scss";

const Snack = () => {
    const dispatch = useDispatch();

    const toggleSnackbar = () => { dispatch(miscSlice.actions.toggleSnackbar({})); };

    return (
        <article className="message is-danger snack">
            <div className="message-header">
                <p>Success</p>
                <button className="delete" aria-label="delete" onClick={toggleSnackbar} />
            </div>
            <div className="message-body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
            </div>
        </article>
    );
};

export default Snack;
