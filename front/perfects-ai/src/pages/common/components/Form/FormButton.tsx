import { Button } from "antd";
import React from "react";
import { css } from "@emotion/css";

export type FormButtonProps = {
  text: string;
  onClick: () => void;
};

const useStyles = () => {
  return {
    button: css`
      margin-left: 0.5rem;
      width: 78px;
    `,
  };
};

export const FormButton: React.FC<FormButtonProps> = ({ text, onClick }) => {
  const styles = useStyles();

  return (
    <Button className={styles.button} onClick={onClick}>
      {text}
    </Button>
  );
};
