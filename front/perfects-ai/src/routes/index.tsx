import React, { lazy, FC } from "react";

import Dashboard from "@/pages/dashboard";
import LoginPage from "@/pages/login";
import LayoutPage from "@/pages/layout";
import SignupPage from "@/pages/signup";
import ForgetPasswordPage from "@/pages/forget-password";
import EmailCodePage from "@/pages/email-code";
import WrapperRouteComponent from "./config";
import { useRoutes, RouteObject } from "react-router-dom";
import { userRoute } from "./user";
import { storylineRoute } from "./storyline";

const NotFound = lazy(() => import("@/pages/404"));

const routeList: RouteObject[] = [
  {
    path: "/",
    element: (
      <WrapperRouteComponent auth={true}>
        <LayoutPage />
      </WrapperRouteComponent>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <WrapperRouteComponent>
            <Dashboard />
          </WrapperRouteComponent>
        ),
      },
      {
        path: "/name",
        element: (
          <WrapperRouteComponent>
            <Dashboard />
          </WrapperRouteComponent>
        ),
      },
      storylineRoute,
      userRoute,
      {
        path: "*",
        element: (
          <WrapperRouteComponent>
            <NotFound />
          </WrapperRouteComponent>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "signup",
    element: <SignupPage />,
  },
  {
    path: "forget-password",
    element: <ForgetPasswordPage />,
  },
  {
    path: "email-code",
    element: <EmailCodePage />,
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
