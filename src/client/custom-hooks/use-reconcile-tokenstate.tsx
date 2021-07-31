import React from 'react';

import validator from '../helpers/validator';

// BETTER TO REPLACE THIS WITH SERVER-SIDE EVENT
// BETTER TO REPLACE THIS WITH SERVER-SIDE EVENT
// BETTER TO REPLACE THIS WITH SERVER-SIDE EVENT
// BETTER TO REPLACE THIS WITH SERVER-SIDE EVENT
const reconcileTokenState = (state, dispatch) => {
    React.useLayoutEffect(() => {     
        validator.validateToken()
            .then((res) => {
                if(res) {
                    //dispatch(setAuth(res.id, res.token, res.shouldUpdateStorage, res.avatar));
                } else {
                    //dispatch(setAuth(null, null, null, true, null));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return;
};  

export default reconcileTokenState;
