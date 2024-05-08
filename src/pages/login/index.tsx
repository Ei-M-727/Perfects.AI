import React, { FC } from "react";
import { Button, Form } from "antd";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { LoginParams } from "@/models/login";
import { useLogin } from "@/api/user/user";
import {
  SingleInputTextNormal,
  Password,
} from "../../pages/common/components/Form/SingleInputText";
import { css } from "@emotion/css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import CryptoJS from "crypto-js";

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

const LoginForm: FC = () => {
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const styles = useStyles();

  const onFinished = async (form: LoginParams) => {
    const { account, password } = form;
    const { result, data } = await loginMutation.mutateAsync({
      account,
      password: CryptoJS.MD5(password).toString(),
    });
    if (result === "success") {
      localStorage.setItem("token", data.token);

      const from = location.state?.from || { pathname: "/dashboard" };
      navigate(from);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <span className={styles.title}>登录账号</span>
        </div>
        <div className={styles.desc}>现在开始你的个性化定制文书服务吧！</div>
      </div>
      <div className={styles.main}>
        <Form<LoginParams> onFinish={onFinished}>
          <SingleInputTextNormal
            label="登录账号"
            name={"account"}
            placeholder="请输入您的用户名或者邮箱"
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            rules={[{ required: true, message: "请输入用户名！" }]}
          />
          <Password
            label="登录密码"
            name={"password"}
            placeholder="请输入您的登录密码"
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            rules={[{ required: true, message: "请输入密码！" }]}
          />
          <div className={styles.forgetPass}>
            <Link to={"/forget-password"}>忘记密码？</Link>
          </div>
          <Form.Item>
            <Button
              size="large"
              className={styles.mainLoginBtn}
              htmlType="submit"
              type="primary"
            >
              登录账号
            </Button>
          </Form.Item>
        </Form>
        <span>还没有账号？</span>
        <Link to={"/signup"}>注册</Link>
      </div>
    </div>
  );
};

export default LoginForm;
