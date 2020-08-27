import * as Typings from "./types";
import { createActions, createReducer } from "reduxsauce";

export const { Types, Creators } = createActions<
  {
    INIT_WEBSOCKET: string;
    ADD_WEB_SOCKET: string;
  },
  {
    initWebsocket(
      payload: Typings.InitWebsocketAction["payload"]
    ): Typings.InitWebsocketAction;
    addWebSocket(
      payload: Typings.AddWebSocketAction["payload"]
    ): Typings.AddWebSocketAction;
  }
>({
  initWebsocket: ["payload"],
  addWebSocket: ["payload"],
});

export const INITIAL_STATE: Typings.WebSocketState = {
  socket: null,
};

const reducer = createReducer<Typings.WebSocketState, Typings.Actions>(
  INITIAL_STATE,
  {
    [Types.ADD_WEB_SOCKET]: addWebSocket,
  }
);

export default reducer;

//funcoes puras
function addWebSocket(
  state = INITIAL_STATE,
  action: Typings.AddWebSocketAction
): Typings.WebSocketState {
  return {
    ...state,
    socket: action.payload.socket,
  };
}
