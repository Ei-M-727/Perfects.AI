import React, { FC } from "react";
import { css } from "@emotion/css";
import { Header } from "@/pages/common/components/Header";

const useStyles = () => {
  return {
    root: css``,
  };
};

const UserInfo: FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Header title="个人基本信息"></Header>
    </div>
  );
};

export default UserInfo;
