import React from 'react';
import { Route, Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Switch } from "react-router-dom";

import Landing from '../pages/Landing';
import Profile from "../pages/Profile";
import Settings from '../pages/Settings';
import About from '../pages/About';
import Terms from '../pages/Terms';
import Friends from "../pages/Friends";
import Conversations from '../pages/Conversations';
import Conversation from '../pages/Conversation';
import Notifications from '../pages/Notifications';
import Feed from '../pages/Feed';
import P404 from '../pages/P404';

import useReconcileAuthState from '../custom-hooks/use-reconcile-authstate';

import Snackbar from './specific/Snackbar/Snackbar';
import Snack from './common/Snack/Snack';
import ErrorBoundary from './specific/Error-boundary/Error-boundary';
import { IStoreState } from '../interfaces/state/i-store-state';
import miscSlice from '../redux/slices/misc/misc';

const Routes = () => {
    const auth = useSelector((state:IStoreState) => state.auth);
    const dispatch = useDispatch();

    useReconcileAuthState(auth, dispatch);

    const isSnackbarShown = useSelector((state:IStoreState) => state.misc.snackbar.isShown);

    const handlePortalClose = (e: any) => e.target.classList.contains("portal-background") && dispatch(miscSlice.actions.togglePortal({}));

    React.useEffect(() => {
        window.addEventListener("click", handlePortalClose);

        return () => { window.removeEventListener("click", handlePortalClose) };
    }, [])

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

                        <Route exact path={`/settings`}>
                            {auth.userName ? <Settings /> : <Redirect to="/" />}
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