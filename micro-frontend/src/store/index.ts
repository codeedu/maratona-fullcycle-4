import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import message from "./message";
import socket from "./socket";
import member from "./member";
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({
    message,socket, member
  }),
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);
export default store;
