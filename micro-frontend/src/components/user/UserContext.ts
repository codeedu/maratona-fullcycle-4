import {createContext} from "react";
import { User } from "../../models";

const UserContext = createContext<User | null>(null);

export default UserContext;
