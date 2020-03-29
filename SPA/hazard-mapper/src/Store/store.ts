import { createStore, applyMiddleware } from 'redux';
import rootReducer from "../reducers/rootReducer";
import epicBase from "../epics/epicBase";
import { createEpicMiddleware } from 'redux-observable';

export const initialState = {}
const epicMiddleware = createEpicMiddleware();

export const configureStore = (initialState={}) => {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(epicMiddleware)
    );

    epicMiddleware.run(epicBase);
    return store;
}