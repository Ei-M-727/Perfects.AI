import React from "react";

import { LogoutOutlined } from "@ant-design/icons";

import { Avatar, Dropdown } from "antd";
import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";

export type AvatarProps = {
  userName: string;
  avatar?: string;
};

const useStyles = () => {
  return {
    dropdown: css`
      position: fixed;
      top: 0;
      right: 0;
    `,
    span: css`
      cursor: pointer;
      padding: 8px;
    `,
  };
};

export const AvatarDropdown: React.FC<AvatarProps> = ({ userName, avatar }) => {
  const styles = useStyles();
  const navigate = useNavigate();

  const loginOut = async () => {
    if (location.pathname !== "/login") {
      localStorage.removeItem("token");
      navigate("/login", {
        replace: true,
      });
    }
  };

  // const onMenuClick = useCallback(
  //   (event) => {
  //   }
  //   []
  // );

  return (
    <Dropdown
      className={styles.dropdown}
      menu={{
        items: [
          {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "退出登录",
            onClick: loginOut,
          },
        ],
      }}
    >
      <span className={styles.span}>
        <Avatar size="small" src={avatar} alt="avatar" />
        <span>{userName}</span>
      </span>
    </Dropdown>
  );
};
