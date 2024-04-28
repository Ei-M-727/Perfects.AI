import React, { FC } from "react";
import { Button, Form } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { ForgetPasswordParams } from "@/models/forget-password";
import { useForgetPassword } from "@/api/user/user";
import { SingleInputTextNormal } from "../common/components/Form";
import { css } from "@emotion/css";
import { MailOutlined } from "@ant-design/icons";

const useStyles = () => {
  return {
    container: css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      overflow: auto;
    `,
    top: css`
      text-align: center;
    `,
    header: css`
      height: 44px;
      line-height: 44px;
    `,
    mainLoginBtn: css`
      width: 100%;
    `,
    title: css`
      position: relative;
      top: 2px;
      font-weight: 600;
      font-size: 33px;
      font-family: Avenir, "Helvetica Neue", Arial, Helvetica, sans-serif;
    `,
    desc: css`
      margin-top: 12px;
      margin-bottom: 40px;
    `,
    main: css`
      width: 328px;
      margin: 0 auto;
    `,
    forgetPass: css`
      margin-bottom: 20px;
    `,
  };
};

const ForgetPassword: FC = () => {
  const mutation = useForgetPassword();
  const navigate = useNavigate();
  const styles = useStyles();

  const onFinished = async (form: ForgetPasswordParams) => {
    const result = await mutation.mutateAsync(form);

    if (result.status) {
      navigate("/emailCode");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <span className={styles.title}>重置密码</span>
        </div>
        <div className={styles.desc}>请输入您的注册邮箱来重置密码</div>
      </div>
      <div className={styles.main}>
        <Form<ForgetPasswordParams> onFinish={onFinished}>
          <SingleInputTextNormal
            label="邮箱"
            name={"email"}
            placeholder="请输入您的注册邮箱地址"
            type={"email"}
            prefix={<MailOutlined />}
            rules={[{ required: true, message: "请输入邮箱！" }]}
          />
          <Form.Item>
            <Button
              size="large"
              className={styles.mainLoginBtn}
              htmlType="submit"
              type="primary"
            >
              获取验证码
            </Button>
          </Form.Item>
        </Form>
        <Link to={"/login"}>回到登录页面</Link>
      </div>
    </div>
  );
};

export default ForgetPassword;
