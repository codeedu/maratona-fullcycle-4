import * as Typings from "./types";
import { createActions, createReducer } from "reduxsauce";
import update from "immutability-helper";

export const { Types, Creators } = createActions<
  {
    ADD_MEMBER: string;
    ADD_MEMBERS: string;
    REQUEST_MEMBERS: string;
    REMOVE_MEMBER: string;
  },
  {
    addMember(
      payload: Typings.AddMemberAction["payload"]
    ): Typings.AddMemberAction;
    addMembers(
      payload: Typings.AddMembersAction["payload"]
    ): Typings.AddMembersAction;
    requestMembers(
      payload: Typings.RequestMembersAction["payload"]
    ): Typings.RequestMembersAction;
    removeMember(
      payload: Typings.RemoveMemberAction["payload"]
    ): Typings.RemoveMemberAction;
  }
>({
  addMember: ["payload"],
  addMembers: ["payload"],
  requestMembers: ["payload"],
  removeMember: ["payload"],
});

export const INITIAL_STATE: Typings.MembersState = {
  servers: [],
};

const reducer = createReducer<Typings.MembersState, Typings.Actions>(
  INITIAL_STATE,
  {
    [Types.ADD_MEMBER]: addMember,
    [Types.ADD_MEMBERS]: addMembers,
    [Types.REMOVE_MEMBER]: removeMember
  }
);

export default reducer;

function addMember(
  state = INITIAL_STATE,
  action: Typings.AddMemberAction
): Typings.MembersState {
  const serverId = action.payload.serverId;
  const indexServer = findIndexServer(state.servers, serverId);
  if (indexServer === -1) {
    return {
      ...state,
      servers: [
        ...state.servers,
        { id: serverId, members: [action.payload.member] },
      ],
    };
  } else {
    const server = state.servers[indexServer];
    return {
      ...state,
      servers: update(state.servers, {
        [indexServer]: {
          $set: {
            ...server,
            members: [...server.members, action.payload.member],
          },
        },
      }),
    };
  }
}

function addMembers(
  state = INITIAL_STATE,
  action: Typings.AddMembersAction
): Typings.MembersState {
  const serverId = action.payload.serverId;
  const indexServer = findIndexServer(state.servers, serverId);
  if (indexServer === -1) {
    return {
      ...state,
      servers: [
        ...state.servers,
        { id: serverId, members: action.payload.members },
      ],
    };
  } else {
    const server = state.servers[indexServer];
    return {
      ...state,
      servers: update(state.servers, {
        [indexServer]: {
          $set: {
            ...server,
            members: action.payload.members,
          },
        },
      }),
    };
  }
}

function removeMember(
  state = INITIAL_STATE,
  action: Typings.RemoveMemberAction
): Typings.MembersState {
  const serverId = action.payload.serverId;
  const indexServer = findIndexServer(state.servers, serverId);
  if (indexServer === -1) {
    return state;
  } else {
    const server = state.servers[indexServer];
    const indexMember = server.members.findIndex(
      (m) => m.id === action.payload.memberId
    );
    if (indexMember === -1) {
      return state;
    }
    return {
      ...state,
      servers: update(state.servers, {
        [indexServer]: {
          $set: {
            ...server,
            members: update(server.members, { $splice: [[indexMember, 1]] }),
          },
        },
      }),
    };
  }
}

function findIndexServer(servers: Typings.Server[], id: string) {
  return servers.findIndex((server) => server.id === id);
}
