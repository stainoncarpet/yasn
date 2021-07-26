import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import About from '../pages/About';
import Test from '../pages/Test';
import Terms from '../pages/Terms';

import getApolloClient from "../data/apollo/apollo-client";
import store from '../data/redux/configure-store';
import { establishSocketConnection } from '../data/sockets/root-socket';

import UserContext, { userReducer, initialState } from "../data/context/User-context";

import useReconcileTokenState from '../custom-hooks/use-reconcile-tokenstate';

const App = () => {
    const [state, dispatch] = React.useReducer(userReducer, initialState);

    const apolloClient = getApolloClient("http://localhost:3000/graphql", state.user.token);

    useReconcileTokenState(state, dispatch);
    // useReconcileTokenState(store, store.dispatch);

    return (
        //@ts-ignore
        <UserContext.Provider value={{ state, dispatch }}>
            <ApolloProvider client={apolloClient}>
                <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" render={() => <Home />} />
                        <Route exact path="/about" render={() => <About />} />

                        <Route exact path="/profile"> 
                            {state.user.id ? <Profile /> : <Redirect to="/login" />}
                        </Route>

                        <Route exact path="/profile/:id"> 
                            {<Redirect to="/profile" />}
                        </Route>

                        <Route exact path="/login"> 
                            {state.user.id ? <Redirect to={`/profile/${state.user.id}`} /> : <Login />}
                        </Route>
                        <Route exact path="/signup"> 
                            {state.user.id ? <Redirect to={`/profile/${state.user.id}`} /> : <Signup />}
                        </Route>

                        <Route exact path="/terms-of-service" render={() => <Terms />} />

                        <Route exact path="/testing" render={() => <Test />} />
                        
                        <Route render={() => <h1>Page doesn't exist</h1>} />
                    </Switch>
                </BrowserRouter>
                </Provider>
            </ApolloProvider>
        </UserContext.Provider>
    );
};

export default App;