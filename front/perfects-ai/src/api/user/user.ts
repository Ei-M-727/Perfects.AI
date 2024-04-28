import { LoginParams, LoginResult } from "@/models/login";
import { prefix } from "./request";
import { EmailResult, ForgetPasswordParams } from "@/models/forget-password";
import { usePost, useGet } from "@/api/axios";
import { User } from "@/models/user";
import { MenuList } from "@models/menu.interface";
import { SignupParams } from "@/models/signup";
import { CommonResult } from "@/models";

export const useLogin = () => {
  return usePost<LoginParams, CommonResult<LoginResult>>(`${prefix}/login`);
};

export const useSignup = () => {
  return usePost<SignupParams, CommonResult<undefined>>(`${prefix}/register`);
};

export const useForgetPassword = () => {
  return usePost<ForgetPasswordParams, EmailResult>(
    `${prefix}/getVcodeByEmail`
  );
};

export const useVerifyEmailCode = () => {
  return usePost<ForgetPasswordParams, EmailResult>(
    `${prefix}/getVcodeByEmail`
  );
};

export const useGetAccountInfo = () => {
  return usePost<object, CommonResult<User>>(`${prefix}/getAccountInfo`);
};

export const useGetCurrentMenus = () => {
  return useGet<MenuList>(`${prefix}/current/menu`);
};
