// @flow
import * as React from "react";
import { Redirect, useLocation } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { Loading } from "../components/Loading";

export const LoginPage: React.FC = () => {
  const { keycloak } = useKeycloak();
  const location = useLocation();

  //@ts-ignore
  const { from } = location.state || { from: { pathname: "/" } };
  if (keycloak!.authenticated) {
    return <Redirect to={from} />;
  } else {
    keycloak!.login();
    return <Loading />;
  }
};
