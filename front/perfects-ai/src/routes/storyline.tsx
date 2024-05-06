import React from "react";

import Name from "@/pages/storyline/name";
import WrapperRouteComponent from "./config";
import { RouteObject } from "react-router-dom";

export const storylineRoute: RouteObject = {
  path: "/storyline",
  children: [
    {
      id: "1",
      path: "/storyline/name",
      element: (
        <WrapperRouteComponent>
          <Name />
        </WrapperRouteComponent>
      ),
    },
  ],
};
