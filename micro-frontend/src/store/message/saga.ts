import { eventChannel } from "redux-saga";
import { fork, take, call, put, actionChannel } from "redux-saga/effects";
import { Types, Creators } from "./index";
import { Types as WebSocketTypes } from "../socket/index";
import { authHttp } from "../../util/http";
import { Message } from "../../models";

function webSocketEvents(socket: SocketIOClient.Socket) {
  return eventChannel((emit) => {
    socket.on("new-message", ({ message }: { message: Message }) => {
      emit(Creators.addMessage({ message }));
    });
    return () => {};
  });
}

function* readEvents(socket: SocketIOClient.Socket) {
  const channel = yield call(webSocketEvents, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* writeEvents(socket: SocketIOClient.Socket) {
  while (true) {
    const { payload } = yield take(Types.SEND_MESSAGE);
    socket.emit("send-message", payload);
  }
}

function* handleEvents(socket: SocketIOClient.Socket) {
  yield fork(readEvents, socket);
  yield fork(writeEvents, socket);
}

function* connectServer(socket: any) {
  while (true) {
    let { payload } = yield take(Types.JOIN_SERVER);
    socket.emit("join", { server_id: payload.serverId });
  }
}

function messagesHttp(channelId: string) {
  return authHttp.get(`channels/${channelId}/messages`);
}

function* fetchMessages() {
  const channel = yield actionChannel(Types.ACTIVE_CHANNEL);
  while (true) {
    const { payload } = yield take(channel);

    const { data } = yield call(messagesHttp, payload.channelId);
    if (data.length) {
      yield put(
        Creators.addMessages({
          messages: data,
        })
      );
    }
  }
}

export function* messageSaga() {
  const { payload } = yield take(WebSocketTypes.ADD_WEB_SOCKET);
  const socket = payload.socket;
  yield fork(connectServer, socket);
  yield fork(handleEvents, socket);
  yield fork(fetchMessages);
}
