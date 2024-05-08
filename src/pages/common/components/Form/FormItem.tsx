import { Form } from "antd";
import { Rule } from "antd/lib/form";
import { NamePath } from "antd/lib/form/interface";
import React from "react";
import { css } from "@emotion/css";

export type FormItemProps = {
  label: string;
  children?: React.ReactNode;
  name: NamePath;
  className?: string;
  rules?: Rule[];
  direction?: "row" | "column";
};

const useStyles = () => {
  return {
    antColumn: css`
      .ant-form-item-row {
        display: block;
        & > input {
          border-radius: 8px;
          height: 42px;
          width: 350px;
          font-size: 16px;
          background-color: #fcfcfd;
          border: 1px solid #cfd0d7;
          padding: 1px 5px;
        }
        .ant-form-item-label {
          text-align: start;
          & > label::before {
            display: none !important;
          }
          & > label::after {
            display: inline-block;
            margin-right: 4px;
            color: #ff4d4f;
            font-size: 14px;
            font-family: SimSun, sans-serif;
            line-height: 1;
            content: "*";
          }
        }
      }
    `,
  };
};

export const FormItem: React.FC<FormItemProps> = ({
  label,
  children,
  name,
  className,
  rules,
  direction = "column",
}) => {
  const styles = useStyles();

  return (
    <Form.Item
      label={label}
      className={`${
        direction === "column" ? styles.antColumn : null
      } ${className}`}
      name={name}
      rules={rules}
    >
      {children}
    </Form.Item>
  );
};
