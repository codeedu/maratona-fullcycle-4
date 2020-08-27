import { createContext, Dispatch, SetStateAction } from "react";
import { Server } from "../../models";

interface ServerContextProps {
  serverSelected: {
    data: Server | null;
    update: Dispatch<SetStateAction<Server | null>>;
  };
  servers: {
    data: Server[];
    update: Dispatch<SetStateAction<Server[]>>;
  };
}

const ServerContext = createContext<ServerContextProps>({
  serverSelected: {
    data: {} as any,
    update: (server) => {},
  },
  servers: {
    data: [],
    update: (servers) => {},
  },
});

export default ServerContext;
