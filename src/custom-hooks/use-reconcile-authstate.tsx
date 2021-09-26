import React from 'react';

import validator from '../helpers/validator';
import authSlice from '../redux/slices/auth/auth';
import { rootSoket } from '../redux/configure-store';
import { getUnreadEvents } from '../redux/slices/user/thunks';
import userSlice from '../redux/slices/user/user';

const reconcileAuthState = (auth, dispatch) => {
    React.useLayoutEffect(() => {
        validator.validateAuth()
            .then((validationResult) => {
                if(validationResult.msg === "OK") {
                    console.log("cookie validation success", validationResult);
                    rootSoket.emit("check-in-global-room");
                    dispatch(getUnreadEvents({ skip: null, limit: null }));
                } else {
                    console.log("cookie validation fail");
                    dispatch(userSlice.actions.resetUserData({}));
                    dispatch(authSlice.actions.removeClientAuth({}));
                }
            })
            .catch((e) => {
                console.error(e);
            });
    }, [auth._id]);
};

export default reconcileAuthState;