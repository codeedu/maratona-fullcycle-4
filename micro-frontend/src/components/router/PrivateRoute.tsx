import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { AuthLayout } from "../Layout/AuthLayout";

interface PrivateRouteProps extends RouteProps {
  authLayout?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const { component, authLayout = true, ...rest } = props;
  const Component: any = component;
  const { keycloak } = useKeycloak();

  return (
    <Route
      {...rest}
      render={(props) =>
        keycloak!.authenticated ? (
          authLayout ? (
            <AuthLayout>
              <Component {...props} />
            </AuthLayout>
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
