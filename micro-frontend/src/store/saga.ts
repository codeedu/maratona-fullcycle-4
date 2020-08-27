import { all } from "redux-saga/effects";
import { webSocketSaga } from "./socket/saga";
import { messageSaga } from "./message/saga";
import { membersSaga } from "./member/saga";

export default function* rootSaga() {
  yield all([webSocketSaga(), messageSaga(), membersSaga()]);
}
