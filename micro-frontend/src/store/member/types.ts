import { AnyAction } from "redux";

export interface User{
  id: string;
  name: string;
  photo_url: string;
}

export interface Server{
  id: string;
  members: User[]
}

export interface MembersState {
  servers: Server[];
}

export interface RequestMembersAction extends AnyAction {
  payload: {
    serverId: string;
  };
}

export interface AddMemberAction extends AnyAction {
  payload: {
    serverId: string;
    member: User;
  };
}

export interface AddMembersAction extends AnyAction {
  payload: {
    serverId: string;
    members: User[];
  };
}

export interface RemoveMemberAction extends AnyAction {
  payload: {
    serverId: string;
    memberId: string;
  };
}

export type Actions =
  | AddMemberAction
  | AddMembersAction
  | RemoveMemberAction;
