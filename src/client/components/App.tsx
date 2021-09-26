import React from 'react';
import { Provider } from "react-redux";
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';

import store from '../redux/configure-store';

import Routes from './Routes';
import { persistor } from '../redux/configure-store';

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Routes />
            </PersistGate>
        </Provider>
    );
};

export default App;