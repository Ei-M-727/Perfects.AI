import React from "react";

import UserInfo from "@/pages/user/userInfo";
import WrapperRouteComponent from "./config";
import { RouteObject } from "react-router-dom";

export const userRoute: RouteObject = {
  path: "/user",
  children: [
    {
      id: "1",
      path: "/user/baseInfo",
      element: (
        <WrapperRouteComponent>
          <UserInfo />
        </WrapperRouteComponent>
      ),
    },
  ],
};
