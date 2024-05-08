import React from "react";

import Name from "@/pages/storyline/name";
import ExperienceOne from "@/pages/storyline/experienceOne";
import ExperienceTwo from "@/pages/storyline/experienceTwo";
import ExperienceThree from "@/pages/storyline/experienceThree";

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
    {
      id: "2",
      path: "/storyline/experienceOne",
      element: (
        <WrapperRouteComponent>
          <ExperienceOne />
        </WrapperRouteComponent>
      ),
    },
    {
      id: "3",
      path: "/storyline/experienceTwo",
      element: (
        <WrapperRouteComponent>
          <ExperienceTwo />
        </WrapperRouteComponent>
      ),
    },
    {
      id: "4",
      path: "/storyline/experienceThree",
      element: (
        <WrapperRouteComponent>
          <ExperienceThree />
        </WrapperRouteComponent>
      ),
    },
  ],
};
