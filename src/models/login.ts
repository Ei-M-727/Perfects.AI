import { CommonResult } from "@/models";

/** user's role */
export type Role = "guest" | "admin";

export interface LoginParams {
  /** 用户名 */
  account: string;
  /** 用户密码 */
  password: string;
}

export interface LoginResult {
  /** auth token */
  token: string;
}

export interface LogoutParams {
  token: string;
}

export interface LogoutResult {}
