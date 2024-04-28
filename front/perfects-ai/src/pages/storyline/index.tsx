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
      align-items: center;
    `,
  };
};

const DashBoardPage: FC = () => {
  const styles = useStyles();

  return (
    <Layout title="信息采集页面" subTitle="基本信息的介绍" percent={10}>
      <Form
        style={{ maxWidth: 600 }}
        onFinish={() => {}}
        onFinishFailed={() => {}}
        className={styles.container}
      >
        <SingleInputTextNormal
          label="您的姓名"
          name={"username"}
          placeholder="Eg. your text here"
          rules={[{ required: true, message: "Please input your username!" }]}
        />
      </Form>
    </Layout>
  );
};

export default DashBoardPage;
