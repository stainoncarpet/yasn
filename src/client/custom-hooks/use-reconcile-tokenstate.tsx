import React from 'react';

import setAuth from '../data/context/action-creators/set-auth';
import validator from '../helpers/validator';

const reconcileTokenState = (state, dispatch) => {
    React.useLayoutEffect(() => {     
        validator.validateAuthCredentials()
            .then((res) => {
                if(res) {
                    dispatch(setAuth(res.id, res.token, res.shouldUpdateStorage, res.avatar));
                } else {
                    dispatch(setAuth(null, null, true, null));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return;
};  

export default reconcileTokenState;
