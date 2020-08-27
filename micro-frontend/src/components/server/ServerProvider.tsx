// @flow
import * as React from "react";
import ServerContext from "./ServerContext";
import { useKeycloak } from "@react-keycloak/web";
import { Server } from "../../models";
import { matchPath, useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Creators as MessageCreators } from "../../store/message";
import { Creators as MemberCreators } from "../../store/member";
import { authHttp } from "../../util/http";

type Props = {};
interface test {
  serverId?: string;
}
export const ServerProvider: React.FC<Props> = (props) => {
  const location = useLocation();
  const history = useHistory();
  const match = matchPath<{ serverId: string; channelId: string }>(
    location.pathname,
    {
      path: "/servers/:serverId?/:channelId?",
      exact: true,
      strict: false,
    }
  );
  
  const { serverId } = match?.params || { serverId: null };
  const [serverSelected, setServerSelected] = React.useState<Server | null>(
    null
  );
  const [servers, setServers] = React.useState<Server[]>([]);
  const { keycloak } = useKeycloak();
  const dispatch = useDispatch();
  const token = keycloak?.token;

  React.useEffect(() => {
    if (!token) {
      return;
    }
    (async () => {
      const { data } = await authHttp.get("servers");
      setServers(data);
    })();
  }, [token]);

  React.useEffect(() => {
    if (!serverId && servers.length && match?.url.startsWith('/servers')) {
      console.log(match);
      return history.replace(`/servers/${servers[0].id}`);
    }
  }, [serverId, servers, history, match]);

  React.useEffect(() => {
    if (serverId && servers.length) {
      const server = servers.find((server) => server.id === serverId) as Server;
      setServerSelected(server);
      dispatch(MemberCreators.requestMembers({ serverId: server.id }));
    }
  }, [serverId, servers, dispatch]);

  React.useEffect(() => {
    if (!servers.length) {
      return;
    }
    servers.forEach((server) => {
      dispatch(
        MessageCreators.joinServer({
          serverId: server.id,
        })
      );
    });
  }, [servers, dispatch]);

  return (
    <ServerContext.Provider
      value={{
        servers: { data: servers, update: setServers },
        serverSelected: { data: serverSelected, update: setServerSelected },
      }}
    >
      {props.children}
    </ServerContext.Provider>
  );
};
