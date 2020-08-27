// @flow
import * as React from "react";
import UserContext from "./UserContext";
import { useKeycloak } from "@react-keycloak/web";
import { authHttp } from "../../util/http";
type Props = {};
export const UserProvider: React.FC<Props> = (props) => {
  const [user, setUser] = React.useState(null);
  const { keycloak } = useKeycloak();
  const isAuth = keycloak?.authenticated;

  React.useEffect(() => {
    if (!isAuth) {
      return;
    }
    (async () => {
      const { data } = await authHttp.get("users/me");
      setUser(data);
    })();
  }, [isAuth]);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};
