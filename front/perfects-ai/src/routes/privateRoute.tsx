import React, { FC, useCallback, useEffect } from "react";
import { Navigate, RouteProps } from "react-router";
import { useRecoilState } from "recoil";
import { userState } from "@/stores/user";
import { useGetAccountInfo } from "@/api/user/user";

const PrivateRoute: FC<RouteProps> = ({ children }) => {
  const useInfo = useGetAccountInfo();
  const [user, setUser] = useRecoilState(userState);
  const logged = localStorage.getItem("token");
  const getUserInfo = useCallback(async () => {
    const { data: currentUser } = await useInfo.mutateAsync({});
    setUser((state) => ({ ...state, ...currentUser, logged: true }));
  }, [setUser, useInfo]);
  useEffect(() => {
    getUserInfo();
  }, []);
  if (useInfo.error) {
    setUser({ ...user, logged: false });
    return <Navigate to="/login" />;
  }
  return user.logged || logged ? (
    <div>{children}</div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
