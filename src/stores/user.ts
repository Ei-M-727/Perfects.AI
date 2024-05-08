import { atom } from "recoil";
import { Locale, User } from "@/models/user";
import { getGlobalState } from "@/models";

const initialState: User = {
  ...getGlobalState(),
  locale: (localStorage.getItem("locale")! ||
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    "en-us") as Locale,
  updateStatus: "name",
  logged: false,
  email: "",
  name: "",
  userId: "",
  gender: "",
  birthday: "",
  mobile: "",
  collapsed: true,
  headimgurl:
    "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
};

export const userState = atom({
  key: "userState",
  default: initialState,
});
