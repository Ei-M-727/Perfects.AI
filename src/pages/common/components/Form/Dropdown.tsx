import React, { CSSProperties, FC } from "react";
import { ChangeEventHandler } from "react";
import { Select } from "antd";
import { FormItem, FormItemProps } from "./FormItem";

export type DropdownProps = {
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
  options: unknown[];
  defaultValue?: unknown;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export const Dropdown: FC<DropdownProps & FormItemProps> = (
  {
    className,
    placeholder,
    style,
    label,
    name,
    rules,
    options,
    defaultValue,
    onChange,
  },
  args
) => {
  return (
    <FormItem label={label} name={name} rules={rules}>
      <Select
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={className}
        style={style}
        options={options}
        onChange={onChange}
        {...args}
      />
    </FormItem>
  );
};
