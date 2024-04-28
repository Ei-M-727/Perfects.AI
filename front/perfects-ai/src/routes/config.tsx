import React, { FC } from "react";
import { PathRouteProps } from "react-router";
import PrivateRoute from "./privateRoute";

export interface WrapperRouteProps extends PathRouteProps {
  /** authorization？ */
  auth?: boolean;
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ auth, children }) => {
  // const { formatMessage } = useIntl();
  if (auth) {
    return <PrivateRoute>{children}</PrivateRoute>;
  }
  return <>{children}</>;
};

export default WrapperRouteComponent;
