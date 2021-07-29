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

const Routes = () => {
    const user = useSelector((state: any) => state.user);

    return (
        <React.Fragment>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() => <Home />} />
                    <Route exact path="/about" render={() => <About />} />

                    <Route exact path={`/profile/:userName`}>
                        {user.userName ? <Profile /> : <Redirect to="/login" />}
                    </Route>

                    <Route exact path="/login">
                        {user.userName ? <Redirect to={`/profile/${user.userName.toLowerCase()}`} /> : <Login />}
                    </Route>

                    <Route exact path="/signup">
                        {user.userName ? <Redirect to={`/profile/${user.userName.toLowerCase()}`} /> : <Signup />}
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
