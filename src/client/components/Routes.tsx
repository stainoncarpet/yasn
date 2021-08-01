import React from 'react';
import { Route, Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import About from '../pages/About';
import Test from '../pages/Test';
import Terms from '../pages/Terms';

import { rootSoket } from '../data/redux/configure-store';

const Routes = () => {
    const auth = useSelector((state: any) => state.auth);

    React.useEffect(() => {
        console.log(auth);

        rootSoket.emit("update-last-online", {token: auth.token});
    }, [auth._id])

    return (
        <React.Fragment>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() => <Home />} />
                    <Route exact path="/about" render={() => <About />} />

                    <Route exact path={`/profile/:userName`}>
                        {auth.userName ? <Profile /> : <Redirect to="/login" />}
                    </Route>

                    <Route exact path="/login">
                        {auth.userName ? <Redirect to={`/profile/${auth.userName.toLowerCase()}`} /> : <Login />}
                    </Route>

                    <Route exact path="/signup">
                        {auth.userName ? <Redirect to={`/profile/${auth.userName.toLowerCase()}`} /> : <Signup />}
                    </Route>

                    <Route exact path="/terms-of-service" render={() => <Terms />} />

                    <Route exact path="/testing" render={() => <Test />} />

                    <Route render={() => <h1>Page doesn't exist</h1>} />
                </Switch>
            </BrowserRouter>
        </React.Fragment>
    );
};

export default Routes;