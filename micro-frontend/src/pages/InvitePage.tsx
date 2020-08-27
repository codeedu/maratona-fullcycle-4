// @flow
import * as React from "react";
import { Server } from "../models";
import { authHttp } from "../util/http";
import { useParams } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { useSnackbar } from "notistack";
type Props = {};
export const InvitePage = (props: Props) => {
  const { serverId } = useParams();
  const { keycloak } = useKeycloak();
  const { enqueueSnackbar } = useSnackbar();
  const [server, setServer] = React.useState<Server | null>(null);

  React.useEffect(() => {
    (async () => {
      const { data } = await authHttp.get(`servers/${serverId}`);
      setServer(data);
    })();
  }, [serverId]);

  async function addMember() {
    await authHttp.post(`servers/${serverId}/members/${keycloak?.subject}`);
    enqueueSnackbar(`Bem-vindo ao grupo ${server?.name}`);
    window.location.href = `${window.location.origin}/servers/${serverId}`;
  }

  return (
    <div className="login">
      <img src={server?.logo_url} className="logo" alt="Logo Code Slack" />

      <div className="container-login">
        <h2>Convite para o grupo {server?.name}</h2>
        <form className="form-login">
          <button type="button" className="btn-code-slack" onClick={addMember}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};
