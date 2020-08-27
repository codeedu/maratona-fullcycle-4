import { take, call, put, actionChannel } from "redux-saga/effects";
import { Types, Creators } from "./index";
import { authHttp } from "../../util/http";

function membersHttp(serverId: string) {
  return authHttp.get(`servers/${serverId}/members`);
}

export function* membersSaga() {
  const channel = yield actionChannel(Types.REQUEST_MEMBERS);
  while (true) {
    const { payload } = yield take(channel);
    const { data } = yield call(membersHttp, payload.serverId);
    yield put(
      Creators.addMembers({
        serverId: payload.serverId,
        members: data,
      })
    );
  }
}
