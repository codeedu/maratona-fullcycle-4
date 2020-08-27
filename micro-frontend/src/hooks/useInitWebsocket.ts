import { Creators as WebSocketCreators } from "../store/socket";
import { useKeycloak } from "@react-keycloak/web";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
const useInitWebsockets = () => {
  const { keycloak } = useKeycloak();
  const dispatch = useDispatch();
  const token = keycloak?.token;

  useEffect(() => {
    if (!token) {
      return;
    }
    dispatch(WebSocketCreators.initWebsocket({ token })); //redux
  }, [token, dispatch]);
};

export default useInitWebsockets;
