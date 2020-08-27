import Keycloak from "keycloak-js";

//@ts-ignore
const keycloakConfig = JSON.parse(process.env.REACT_APP_KEYCLOAK_JSON);
export const keycloak = Keycloak({
  url: keycloakConfig["auth-server-url"],
  realm: keycloakConfig["realm"],
  clientId: keycloakConfig["resource"],
});

export const keycloakProviderInitConfig: any = {
  onLoad: "check-sso",
};
