import React from "react";
import "./scss/main.scss";
import { KeycloakProvider } from "@react-keycloak/web";
import { AppRouter } from "./components/router/AppRouter";
import { keycloak, keycloakProviderInitConfig } from "./util/auth";
import { SnackbarProvider } from "notistack";
import { UserProvider } from "./components/user/UserProvider";

function App() {
  return (
    <KeycloakProvider
      keycloak={keycloak}
      initConfig={keycloakProviderInitConfig}
    >
      <UserProvider>
          <SnackbarProvider maxSnack={3}>
            <AppRouter />
          </SnackbarProvider>
      </UserProvider>
    </KeycloakProvider>
  );
}

export default App;
