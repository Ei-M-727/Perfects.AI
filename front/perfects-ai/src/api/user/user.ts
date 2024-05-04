import { LoginParams, LoginResult } from "@/models/login";
import { prefix } from "./request";
import { ForgetPasswordParams } from "@/models/forget-password";
import { EmailCodeParams } from "@/models/email-code";
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
  return usePost<ForgetPasswordParams, CommonResult<undefined>>(
    `${prefix}/getVcodeByEmail`
  );
};

export const useVerifyEmailCode = () => {
  return usePost<EmailCodeParams, CommonResult<undefined>>(
    `${prefix}/updatePassword`
  );
};

export const useGetAccountInfo = () => {
  return usePost<object, CommonResult<User>>(`${prefix}/getAccountInfo`);
};

export const useGetCurrentMenus = () => {
  return useGet<MenuList>(`${prefix}/current/menu`);
};
