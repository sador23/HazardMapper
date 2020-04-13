import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import {initialState} from './Store/store';
import {createEpicMiddleware} from "redux-observable";
import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "./reducers/rootReducer";
import epicBase from "./epics/epicBase";

const epicMiddleware = createEpicMiddleware();

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const configureStore = () => {
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(
        applyMiddleware(epicMiddleware))
    );

    epicMiddleware.run(epicBase);
    return store;
}


ReactDOM.render(
      <Provider store={configureStore(initialState)}>
          <App />
      </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
