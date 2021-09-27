import React from 'react';

import validator from '../helpers/validator';
import authSlice from '../redux/slices/auth/auth';
import { getUnreadEvents } from '../redux/slices/user/thunks';
import userSlice from '../redux/slices/user/user';
import { rootSocket, profileSocket, userSocket} from '../redux/configure-store';

const reconcileAuthState = (auth, dispatch) => {
    const [isSocketConnectionOn, setIsSocketConnectionOn] = React.useState(true);

    React.useLayoutEffect(() => {
        validator.validateAuth()
            .then((validationResult) => {
                if(validationResult.msg === "OK") {
                    console.log("cookie validation success", validationResult);
                    rootSocket.emit("check-in-global-room");
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

            if(!auth._id && isSocketConnectionOn) {
                userSocket.disconnect();
                profileSocket.disconnect();
                rootSocket.disconnect();

                setIsSocketConnectionOn(false);
            } else if (auth._id && !isSocketConnectionOn){
                userSocket.connect();
                profileSocket.connect();
                rootSocket.connect();

                setIsSocketConnectionOn(true);
            }
    }, [auth._id]);
};

export default reconcileAuthState;