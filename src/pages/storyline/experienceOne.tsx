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
  };
};

const NamePage: FC = () => {
  const styles = useStyles();

  return (
    <Layout
      title="经历信息"
      subTitle="学术背景>您的学术经历和说明"
      percent={20}
    >
      <Form
        style={{ maxWidth: 600 }}
        onFinish={() => {}}
        onFinishFailed={() => {}}
        className={styles.container}
      >
        <SingleInputTextNormal
          label="您的本科院校？"
          name={"university"}
          placeholder="Eg. your text here"
          rules={[{ required: true, message: "Please input your University!" }]}
        />
        <Dropdown
          label="您的本科院校所在国家"
          name={"country"}
          placeholder="选择院校国家"
          options={[
            { value: "1", label: "China" },
            { value: "2", label: "America" },
          ]}
          rules={[{ required: true, message: "Please input your Country!" }]}
          style={{ height: 42 as number | "px", width: 350 as number | "px" }}
        />
        <SingleInputTextNormal
          label="其他本科院校信息？"
          name={"university"}
          placeholder="Eg. your text here"
          type="textarea"
          style={{
            height: 100 as number | "px",
            width: 360 as number | "px",
          }}
        />
      </Form>
    </Layout>
  );
};

export default NamePage;
