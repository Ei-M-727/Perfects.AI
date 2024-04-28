import { userState } from "@/stores/user";
import { useState } from "react";
import { useRecoilState } from "recoil";

export type UserState = {
  index: number;
  key: string;
  percent: number;
};

export type UserStateObj = {
  [key: string]: UserState;
};

export const useUserState = () => {
  const [user] = useRecoilState(userState);
  const [userCurrentState, setUserCurrentState] = useState(user.updateStatus);

  const stateList = ["name", "name1"];

  const stateObj = stateList.reduce<UserStateObj>((acc, key, index) => {
    acc[key] = {
      index,
      key,
      percent: index * 10,
    };
    return acc;
  }, {});

  const pre = () => {
    const index = stateObj[userCurrentState].index - 1;
    if (index < 0) return;
    setUserCurrentState(stateList[index]);
  };

  const next = () => {
    const index = stateObj[userCurrentState].index + 1;
    if (index > stateList.length - 1) return;
    setUserCurrentState(stateList[stateObj[userCurrentState].index + 1]);
  };

  return {
    pre,
    next,
    userCurrentState,
  };
};
