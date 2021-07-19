import React from 'react';

const Buttons = (props) => {
    const {loading, handleSubmit, croppedImageFile} = props;

    return (
        <div className="field is-grouped">
                <div className="control">
                    <button 
                        className={`button is-success${loading ? " is-loading" : ""}`} 
                        onClick={handleSubmit} 
                        disabled={loading || !croppedImageFile}>
                        Submit
                    </button>
                </div>
                <div className="control">
                    <button className="button is-link is-light">Cancel</button>
                </div>
            </div>
    );
};

export default Buttons;
