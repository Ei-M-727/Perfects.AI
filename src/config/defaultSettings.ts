import { Settings as LayoutSettings } from "@ant-design/pro-layout";

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: "light",
  layout: "side",
  contentWidth: "Fluid",
  colorWeak: false,
  title: "文书生成",
  pwa: false,
  iconfontUrl: "",
};

export default Settings;
