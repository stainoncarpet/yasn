import React from 'react';

import validator from '../helpers/validator';
import authSlice from '../redux/slices/auth/auth';
import { rootSoket } from '../redux/configure-store';
import { getUnreadEvents } from '../redux/slices/user/thunks';
import miscSlice from '../redux/slices/misc/misc';
import { ESnackbarType } from '../interfaces/state/i-misc-slice';

const reconcileTokenState = (auth, dispatch) => {
    React.useLayoutEffect(() => {   

        if(auth.token) {
            validator.validateToken(auth._id, auth.token)
                .then((res) => {
                    if(res?.validationResult === false) {
                        dispatch(authSlice.actions.removeClientAuth({}));
                        dispatch(miscSlice.actions.toggleSnackbar({isShown: true, content: "content", type: ESnackbarType.DANGER}));
                    }
                })
                .catch((error) => {
                    console.log("token validation failed", error);
                });

            rootSoket.emit("check-in-global-room", { token: auth.token });
            dispatch(getUnreadEvents({ token: auth.token, skip: null, limit: null }));
        }
    }, []);
};  

export default reconcileTokenState;
