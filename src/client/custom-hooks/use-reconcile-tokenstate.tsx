import React from 'react';

import validator from '../helpers/validator';
import authSlice from '../redux/slices/auth/auth';

const reconcileTokenState = (auth, dispatch) => {
    React.useLayoutEffect(() => {   

        if(auth.token) {
            validator.validateToken(auth._id, auth.token)
            .then((res) => {
                if(res?.validationResult === false) {
                    dispatch(authSlice.actions.removeClientAuth({}));
                }
            })
            .catch((error) => {
                console.log("token validation failed", error);
            });
        }
        
    }, []);
};  

export default reconcileTokenState;
