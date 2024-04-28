export type Locale = "zh-cn" | "en-us";

export interface User {
  userId: string;
  name: string;
  email: string;
  headimgurl: string;
  gender: string;
  birthday: string;
  mobile: string;
  updateStatus: string;
  usercode?: string;
  level?: string;
  sdate?: string;
  edate?: string;
  locale: Locale;
  logged: boolean;
  collapsed: boolean;
}
