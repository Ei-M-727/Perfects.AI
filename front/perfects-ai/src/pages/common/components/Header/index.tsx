import React from "react";

export type HeaderProps = {
  title: string;
  subTitle?: string;
};

export const Header: React.FC<HeaderProps> = ({ title, subTitle }) => {
  return (
    <div>
      <h1>{title}</h1>
      {subTitle && <h5>{subTitle}</h5>}
    </div>
  );
};
