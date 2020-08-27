import io from "socket.io-client";
import {
  take,
  call,
  put,
} from "redux-saga/effects";
import { Types, Creators } from "./index";

function ioConnect(token: string) {
  return new Promise((resolve) => {
    const socket = io(`${process.env.REACT_APP_BACKEND_URL}/channels`, { query: { token } });
    socket.on("connect", () => {
      resolve(socket);
    });
  });
}


export function* webSocketSaga() {
  const { payload } = yield take(Types.INIT_WEBSOCKET);
  const socket = yield call(ioConnect, payload.token);
  yield put(Creators.addWebSocket({socket}));
}