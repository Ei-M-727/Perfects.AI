import React from "react";
import { BrowserRouter } from "react-router-dom";

import { localeConfig } from "@/config/locale";
import { ConfigProvider } from "antd";
import enUS from "antd/es/locale/en_US";
import zhCN from "antd/es/locale/zh_CN";
import "moment/dist/locale/zh-cn";
import RenderRouter from "./routes";
import "./App.less";
import { useRecoilState } from "recoil";
import { userState } from "./stores/user";
import { IntlProvider } from "react-intl";

const App: React.FC = () => {
  const [user] = useRecoilState(userState);
  const { locale } = user;

  // useEffect(() => {
  //   if (locale.toLowerCase() === "en-us") {
  //     moment.locale("en");
  //   } else if (locale.toLowerCase() === "zh-cn") {
  //     moment.locale("zh");
  //   }
  // }, [locale]);

  const getAntdLocale = () => {
    if (locale.toLowerCase() === "en-us") {
      return enUS;
    } else if (locale.toLowerCase() === "zh-cn") {
      return zhCN;
    }
  };

  const getLocale = () => {
    const lang = localeConfig.find((item) => {
      return item.key === locale.toLowerCase();
    });

    return lang?.messages;
  };

  return (
    <ConfigProvider locale={getAntdLocale()} componentSize="middle">
      <IntlProvider locale={locale.split("-")[0]} messages={getLocale()}>
        <BrowserRouter>
          <RenderRouter />
        </BrowserRouter>
      </IntlProvider>
    </ConfigProvider>
  );
};

export default App;
