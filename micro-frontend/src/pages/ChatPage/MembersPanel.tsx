// @flow
import * as React from "react";
import ServerContext from "../../components/server/ServerContext";
import { User } from "../../models";
import { useSelector } from "react-redux";
import { MembersState } from "../../store/member/types";
type Props = {};
export const MembersPanel = (props: Props) => {
  const [moderator, setModerator] = React.useState<User>();
  const { serverSelected: {data: server} } = React.useContext(ServerContext);
  const serverId = server?.id;
  const ownerId = server?.owner_id;
  const members = useSelector<{ member: MembersState }, User[]>((state) => {
    const server = state.member.servers.find((s) => s.id === serverId);
    return server ? server.members : [];
  });
  React.useEffect(() => {
    if (moderator || !members.length) {
      return;
    }
    const moderatorIndex = members.findIndex((m: any) => m.id === ownerId);
    setModerator(members[moderatorIndex]);
  }, [moderator, members, ownerId]);

  return (
    <div className="user-list">
      <div className="container-users">
        <div className="type">
          <p>Moderador</p>
        </div>

        <ul className="list moderator">
          <li>
            <span
              title=""
              className="user-item"
            >
              <div className="user">
                <div className="img-user">
                  <img src={moderator?.photo_url} alt={moderator?.name} />
                </div>
                <p>{moderator?.name}</p>
              </div>

              <span className="fas fa-cog" aria-hidden="true"></span>
            </span>
          </li>
        </ul>
      </div>

      <div className="container-users">
        <div className="type">
          <p>Disponíveis</p>
          <span>{members.length}</span>
        </div>

        <ul className="list">
          {members.map((member, key) => (
            <li key={key}>
              <span
                title=""
                className="user-item"
              >
                <div className="user">
                  <div className="img-user">
                    <img src={member?.photo_url} alt="Usuário" className="" />
                  </div>
                  <p>{member?.name}</p>
                </div>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
