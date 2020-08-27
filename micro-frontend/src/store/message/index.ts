import * as Typings from "./types";
import { createActions, createReducer } from "reduxsauce";
import update from "immutability-helper";

export const { Types, Creators } = createActions<
  {
    JOIN_SERVER: string;
    ACTIVE_CHANNEL: string;
    ADD_MESSAGE: string;
    ADD_MESSAGES: string;
    SEND_MESSAGE: string;
  },
  {
    joinServer(
      payload: Typings.JoinServerAction["payload"]
    ): Typings.JoinServerAction;
    activeChannel(
      payload: Typings.ActiveChannelAction["payload"]
    ): Typings.ActiveChannelAction;
    addMessage(
      payload: Typings.AddMessageAction["payload"]
    ): Typings.AddMessageAction;
    addMessages(
        payload: Typings.AddMessagesAction["payload"]
      ): Typings.AddMessagesAction;
    sendMessage(
        payload: Typings.SendMessageAction["payload"]
      ): Typings.SendMessageAction;
  }
>({
  joinServer: ["payload"],
  activeChannel: ["payload"],
  addMessage: ["payload"],
  addMessages: ["payload"],
  sendMessage: ["payload"]
});

export const INITIAL_STATE: Typings.MessageState = {
  channels: [],
};

const reducer = createReducer<Typings.MessageState, Typings.Actions>(
  INITIAL_STATE,
  {
    [Types.ACTIVE_CHANNEL]: activeChannel,
    [Types.ADD_MESSAGE]: addMessage,
    [Types.ADD_MESSAGES]: addMessages,
  }
);

export default reducer;

function activeChannel(
  state = INITIAL_STATE,
  action: Typings.ActiveChannelAction
) {
  const channelId = action.payload.channelId;
  const indexChannel = findIndexChannel(state.channels, channelId);
  if (indexChannel !== -1) {
    return state;
  }

  return {
    ...state,
    channels: [...state.channels, { id: channelId, messages: [] }],
  };
}

function addMessage(
  state = INITIAL_STATE,
  action: Typings.AddMessageAction
): Typings.MessageState {
  const channelId = action.payload.message.join.parent;
  const indexChannel = findIndexChannel(state.channels, channelId);
  if (indexChannel === -1) {
    return state;
  }
  const channel = state.channels[indexChannel];
  channel.messages = [...channel.messages, action.payload.message];
  return {
    ...state,
    channels: update(state.channels, {
      [channelId]: {
        $set: channel,
      },
    }),
  };
}

function addMessages(
    state = INITIAL_STATE,
    action: Typings.AddMessagesAction
  ): Typings.MessageState {
    const channelId = action.payload.messages[0].join.parent;
    const indexChannel = findIndexChannel(state.channels, channelId);
    if (indexChannel === -1) {
      return state;
    }
    const channel = state.channels[indexChannel];
    if(channel.messages.length){
        return state;
    }
    channel.messages = [...channel.messages, ...action.payload.messages];
    return {
      ...state,
      channels: update(state.channels, {
        [channelId]: {
          $set: channel,
        },
      }),
    };
  }

function findIndexChannel(channels: Typings.Channel[], id: string) {
  return channels.findIndex((channel) => channel.id === id);
}
