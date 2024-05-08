import React from "react";
import { Header } from "../../../common/components/Header";
import { ProcessLine } from "../../../common/components/ProcessLine";
import { css } from "@emotion/css";
import { FormButton } from "../../../common/components/Form/FormButton";
import { useUserState } from "../../../hooks/useUserState";

export type LayoutProps = {
  title: string;
  subTitle: string;
  children: React.ReactNode;
  percent: number;
};

const useStyles = () => {
  return {
    root: css`
      padding: 2rem;
    `,
    buttonGroup: css`
      text-align: right;
      margin-right: 2.2rem;
    `,
  };
};

export const Layout: React.FC<LayoutProps> = ({
  title,
  subTitle,
  children,
  percent,
}) => {
  const styles = useStyles();
  const { pre, next } = useUserState();

  return (
    <div className={styles.root}>
      <Header title={title} subTitle={subTitle} />
      {children}
      <div className={styles.buttonGroup}>
        <FormButton text={"取消"} onClick={pre}></FormButton>
        <FormButton text={"下一步"} onClick={next}></FormButton>
      </div>
      <ProcessLine percent={percent} />
    </div>
  );
};
