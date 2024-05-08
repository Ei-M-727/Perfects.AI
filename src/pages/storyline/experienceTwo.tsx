import React, { FC } from "react";
import { Form } from "antd";
import { SingleInputTextNormal } from "../common/components/Form/SingleInputText";
import { Dropdown } from "../common/components/Form/Dropdown";
import { css } from "@emotion/css";
import { Layout } from "./components/Layout";

const useStyles = () => {
  return {
    root: css`
      padding: 2rem;
    `,
    container: css`
      min-height: 55vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    `,
    dropdown: css`
      height: 42px;
      width: 350px;
      font-size: 16px;
      padding: 1px 5px;
      display: inline-block !important;
    `,
  };
};

const NamePage: FC = () => {
  const styles = useStyles();

  return (
    <Layout
      title="经历信息"
      subTitle="学术背景>您的学术经历和说明"
      percent={30}
    >
      <Form
        style={{ maxWidth: 600 }}
        onFinish={() => {}}
        onFinishFailed={() => {}}
        className={styles.container}
      >
        <SingleInputTextNormal
          label="您的本科学位？"
          name={"degree"}
          placeholder="Eg. your text here"
          rules={[{ required: true, message: "Please input your University!" }]}
        />

        <SingleInputTextNormal
          label="您的本科专业？"
          name={"major"}
          placeholder="Eg. your text here"
          rules={[{ required: true, message: "Please input your University!" }]}
        />
        <Dropdown
          label="您的本科成绩"
          name={"score"}
          placeholder="选择评分标准"
          options={[
            { value: "1", label: "IELTS" },
            { value: "2", label: "TOEFL" },
          ]}
          rules={[{ required: true, message: "Please input your Country!" }]}
          style={{ height: 42 as number | "px", width: 350 as number | "px" }}
        />
        <SingleInputTextNormal
          label=""
          name={""}
          placeholder="Eg. 3.6/4.0"
          rules={[{ required: true, message: "Please input your University!" }]}
        />
      </Form>
    </Layout>
  );
};

export default NamePage;
