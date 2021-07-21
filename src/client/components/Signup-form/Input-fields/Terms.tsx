import React from 'react';

const Terms = (props) => {
    const {areTermsAccepted, setAreTermsAccepted} = props;

    return (
        <div className="field">
                <div className="control">
                    <label className="checkbox">
                        <input type="checkbox" onChange={setAreTermsAccepted} value={areTermsAccepted} />
                        I agree to the <a href="#">terms and conditions</a>
                    </label>
                </div>
            </div>
    );
};

export default Terms;
