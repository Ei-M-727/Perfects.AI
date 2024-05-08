import React from "react";
import { Progress } from "antd";
import { css } from "@emotion/css";
import { ProgressSize, ProgressType } from "antd/es/progress/progress";

export type ProcessLineProps = {
  percent: number;
  strokeLinecap?: "butt" | "square" | "round";
  type?: ProgressType;
  gapDegree?: number;
  format?: (percent?: number, successPercent?: number) => React.ReactNode;
  size?: number | [number | string, number] | ProgressSize;
};

const useStyles = () => {
  return {
    root: css`
      margin-top: 0.7rem;
    `,
  };
};

export const ProcessLine: React.FC<ProcessLineProps> = (
  { percent, strokeLinecap, type, gapDegree, format, size },
  args
) => {
  const styles = useStyles();

  return (
    <Progress
      className={styles.root}
      percent={percent}
      strokeColor={"#D67318"}
      strokeLinecap={strokeLinecap}
      type={type}
      gapDegree={gapDegree}
      format={format}
      size={size}
      {...args}
    />
  );
};
