import React, { FC } from "react";
import { Form } from "antd";
import { SingleInputTextNormal } from "../common/components/Form/SingleInputText";
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
      percent={40}
    >
      <Form
        style={{ maxWidth: 600 }}
        onFinish={() => {}}
        onFinishFailed={() => {}}
        className={styles.container}
      >
        <SingleInputTextNormal
          label="您的其他学术经历？"
          name={"ae"}
          placeholder="Eg. your text here"
          type="textarea"
          style={{
            height: 100 as number | "px",
            width: 360 as number | "px",
          }}
        />
        <SingleInputTextNormal
          label="您的其他教育背景以及学术历程？"
          name={"ebandae"}
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
