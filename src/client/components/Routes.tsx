import React from 'react';
import { Route, Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Switch } from "react-router-dom";

import Landing from '../pages/Landing';
import Profile from "../pages/Profile";
import About from '../pages/About';
import Terms from '../pages/Terms';
import Friends from "../pages/Friends";
import Conversations from '../pages/Conversations';
import Conversation from '../pages/Conversation';
import Notifications from '../pages/Notifications';
import Feed from '../pages/Feed';
import P404 from '../pages/P404';

import { rootSoket } from '../redux/configure-store';
import { getUnreadEvents } from '../redux/slices/user/thunks';

import useReconcileTokenState from '../custom-hooks/use-reconcile-tokenstate';

import Snackbar from './Snackbar/Snackbar';
import Snack from './common/Snack/Snack';
import ErrorBoundary from './Error-boundary/Error-boundary';

const Routes = () => {
    const auth = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

    useReconcileTokenState(auth, dispatch);

    const isSnackbarShown = useSelector((state: any) => state.misc.snackbar.isShown);

    React.useEffect(() => {
        if(auth._id && auth.token){
            rootSoket.emit("update-last-online", { token: auth.token });
            rootSoket.emit("check-in-global-room", { userId: auth._id });
            dispatch(getUnreadEvents({ token: auth.token, skip: null, limit: null }));
        }
    }, [auth._id]);

    return (
        <React.Fragment>
            <ErrorBoundary>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={"/"}>
                            {auth.userName ? <Redirect to={`/profile/${auth.userName.toLowerCase()}`} /> : <Landing />}
                        </Route>
                        <Route exact path="/about" render={() => <About />} />

                        <Route exact path={`/profile/:userName`}>
                            {auth.userName ? <Profile /> : <Redirect to="/" />}
                        </Route>

                        <Route exact path={`/friends`}>
                            {auth.userName ? <Friends /> : <Redirect to="/" />}
                        </Route>

                        <Route exact path={`/conversations`}>
                            {auth.userName ? <Conversations /> : <Redirect to="/" />}
                        </Route>

                        <Route exact path={`/conversations/:conversationId`}>
                            {auth.userName ? <Conversation /> : <Redirect to="/" />}
                        </Route>

                        <Route exact path={`/notifications`}>
                            {auth.userName ? <Notifications /> : <Redirect to="/" />}
                        </Route>

                        <Route exact path={`/feed`}>
                            {auth.userName ? <Feed /> : <Redirect to="/" />}
                        </Route>

                        <Route exact path="/terms-of-service" render={() => <Terms />} />

                        <Route render={() => <P404 />} />
                    </Switch>
                </BrowserRouter>
                {isSnackbarShown && <Snackbar><Snack /></Snackbar>}
            </ErrorBoundary>
        </React.Fragment>
    );
};

export default Routes;