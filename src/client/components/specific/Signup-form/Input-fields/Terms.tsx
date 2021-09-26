import React from 'react';
import { Link } from 'react-router-dom';

const Terms = (props) => {
    const {areTermsAccepted, setAreTermsAccepted} = props;

    return (
        <div className="field mt-2">
                <div className="control">
                    <label className="checkbox">
                        <input type="checkbox" onChange={setAreTermsAccepted} value={areTermsAccepted} />
                        I agree to the <Link to="/terms-of-service" target="_blank">terms and conditions</Link>
                    </label>
                </div>
            </div>
    );
};

export default Terms;
