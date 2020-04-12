import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import {initialState} from './Store/store';
import {createEpicMiddleware} from "redux-observable";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./reducers/rootReducer";
import epicBase from "./epics/epicBase";

const epicMiddleware = createEpicMiddleware();

const configureStore = () => {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(epicMiddleware)
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
