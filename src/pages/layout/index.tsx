import React, { FC, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { userState } from "@/stores/user";
import { useRecoilState } from "recoil";

import type { MenuDataItem } from "@ant-design/pro-layout";
import ProLayout from "@ant-design/pro-layout";
import {
  SmileOutlined,
  HeartOutlined,
  FrownOutlined,
  SaveOutlined,
  ProfileOutlined,
  FileWordOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useLocale } from "@/locales";
import { useUserState } from "../hooks/useUserState";
import { css } from "@emotion/css";
import settings from "../../config/defaultSettings";
import { AvatarDropdown } from "./components/RightContent/AvatarDropdown";

const IconMap: { [key: string]: React.ReactNode } = {
  smile: <SmileOutlined />,
  heart: <HeartOutlined />,
  frown: <FrownOutlined />,
  shopping: <ShoppingOutlined />,
  profile: <ProfileOutlined />,
  saved: <SaveOutlined />,
  file: <FileWordOutlined />,
};

const useStyles = () => {
  return {
    proLayout: css`
      :where(.css-dev-only-do-not-override-1op6aal).ant-pro-layout
        .ant-pro-sider.ant-pro-sider-fixed {
        background: #f2dfcc;
      }
    `,
  };
};

const menuList = [
  {
    path: "/dashboard",
    name: "面板",
    locale: "menu.dashboard",
    icon: "heart",
    children: [],
  },
  {
    path: "/storyline",
    name: "文书管理",
    locale: "menu.storyline",
    icon: "file",
    children: [],
  },
  {
    path: "/user",
    name: "个人中心",
    locale: "menu.user",
    icon: "heart",
    children: [
      {
        id: 1,
        path: "/user/baseInfo",
        name: "个人基本信息",
        locale: "menu.user.baseInfo",
        icon: "profile",
        children: [],
      },
      {
        id: 2,
        path: "/user/baseInfo1",
        name: "订阅/付款",
        locale: "menu.user.pay",
        icon: "shopping",
        children: [],
      },
      {
        id: 3,
        path: "/user/baseInfo2",
        name: "已储存的经历",
        locale: "menu.user.store",
        icon: "saved",
        children: [],
      },
    ],
  },
];

const LayoutPage: FC = () => {
  // const { data: menuList } = useGetCurrentMenus();
  const styles = useStyles();
  const [user, setUser] = useRecoilState(userState);
  const { userCurrentState } = useUserState();
  const { collapsed } = user;
  const location = useLocation();
  const navigate = useNavigate();
  const { formatMessage } = useLocale();
  useEffect(() => {
    if (location.pathname === "/storyline") {
      navigate(`storyline/${userCurrentState}`);
    }
  }, [navigate, location, userCurrentState]);

  const toggle = () => {
    setUser({ ...user, collapsed: !collapsed });
  };

  const loopMenuItem = (menus?: MenuDataItem[]): MenuDataItem[] => {
    if (!menus) return [];

    const m = menus.map(({ icon, children, ...item }) => ({
      ...item,
      icon: icon && IconMap[icon as string],
      children: children && loopMenuItem(children),
    }));
    return m;
  };

  return (
    <ProLayout
      className={styles.proLayout}
      collapsed={collapsed}
      location={{
        pathname: location.pathname,
      }}
      {...settings}
      onCollapse={toggle}
      formatMessage={formatMessage}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return defaultDom;
        }
        return (
          <Link to={menuItemProps.path}>
            <div style={{ display: "flex" }}>
              <span>{defaultDom}</span>
            </div>
          </Link>
        );
      }}
      avatarProps={{
        render: () => {
          return (
            <AvatarDropdown userName={user.name} avatar={user.headimgurl} />
          );
        },
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: "/",
          breadcrumbName: formatMessage({ id: "menu.home" }),
        },
        ...routers,
      ]}
      itemRender={(route, _params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join("/")}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      menuDataRender={() => loopMenuItem(menuList)}
      collapsedButtonRender={() => {
        return (
          <div
            onClick={toggle}
            style={{
              cursor: "pointer",
              fontSize: "16px",
              padding: "0 0 10px 16px",
            }}
          >
            <span id="sidebar-trigger">
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span>
          </div>
        );
      }}
    >
      <Outlet />
    </ProLayout>
  );
};

export default LayoutPage;
