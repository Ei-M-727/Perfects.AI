import React, { CSSProperties, FC } from "react";
import { ChangeEventHandler } from "react";
import { Input } from "antd";
import { FormItem, FormItemProps } from "./FormItem";
import { css } from "@emotion/css";

export type SingleTextProps = {
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
  value?: string | ReadonlyArray<string> | number;
  type?: string;
  prefix?: React.ReactNode;
  onInputChange?: ChangeEventHandler<HTMLInputElement>;
};

const useStyles = () => {
  return {
    input: css`
      border-radius: 8px;
      height: 42px;
      width: 350px;
      font-size: 16px;
      background-color: #fcfcfd;
      border: 1px solid #cfd0d7;
      padding: 1px 5px;
    `,
  };
};

export const SingleInputTextNormal: FC<SingleTextProps & FormItemProps> = (
  {
    className,
    placeholder,
    style,
    value,
    label,
    name,
    rules,
    type,
    prefix,
    onInputChange,
  },
  args
) => {
  const styles = useStyles();

  return (
    <FormItem label={label} name={name} rules={rules}>
      <Input
        placeholder={placeholder}
        className={`${styles.input} ${className}`}
        style={style}
        onChange={onInputChange}
        value={value}
        type={type}
        prefix={prefix}
        {...args}
      />
    </FormItem>
  );
};

export const Password: FC<SingleTextProps & FormItemProps> = (
  {
    className,
    placeholder,
    style,
    value,
    label,
    name,
    rules,
    prefix,
    onInputChange,
  },
  args
) => {
  const styles = useStyles();

  return (
    <FormItem label={label} name={name} rules={rules}>
      <Input.Password
        placeholder={placeholder}
        className={`${styles.input} ${className}`}
        style={style}
        onChange={onInputChange}
        value={value}
        prefix={prefix}
        {...args}
      />
    </FormItem>
  );
};
