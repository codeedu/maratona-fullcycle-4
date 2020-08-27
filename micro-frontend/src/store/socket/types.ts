import { AnyAction } from "redux";

export interface WebSocketState {
  socket: SocketIOClient.Socket | null;
}

export interface InitWebsocketAction extends AnyAction {
  payload: {
    token: string;
  };
}

export interface AddWebSocketAction extends AnyAction {
  payload: {
    socket: SocketIOClient.Socket;
  };
}

export type Actions = InitWebsocketAction | AddWebSocketAction;
