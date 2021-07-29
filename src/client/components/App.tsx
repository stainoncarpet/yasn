import React from 'react';
import { Provider } from "react-redux";
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';

import store from '../data/redux/configure-store';

import useReconcileTokenState from '../custom-hooks/use-reconcile-tokenstate';

import Routes from './Routes';
import { persistor } from '../data/redux/configure-store';

const App = () => {
    //useReconcileTokenState(state, dispatch);
    // useReconcileTokenState(store, store.dispatch);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Routes />
            </PersistGate>
        </Provider>
    );
};

export default App;