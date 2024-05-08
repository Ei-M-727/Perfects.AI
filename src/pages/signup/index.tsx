import React, { FC } from "react";
import { Button, Form, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { SignupParams } from "@/models/signup";
import { useSignup } from "@/api/user/user";
import { Password, SingleInputTextNormal } from "../common/components/Form";
import { css } from "@emotion/css";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
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

const Signup: FC = () => {
  const sinupMutation = useSignup();
  const navigate = useNavigate();
  const styles = useStyles();

  const onFinished = async (form: SignupParams) => {
    const { name, password, email } = form;
    const { result } = await sinupMutation.mutateAsync({
      name,
      password: CryptoJS.MD5(password).toString(),
      email,
    });
    if (result === "success") {
      message.success("注册成功，3秒后返回登陆页面");
      const timer = setTimeout(() => {
        clearInterval(timer);
        navigate("/login");
      }, 3000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <span className={styles.title}>创建账号</span>
        </div>
        <div className={styles.desc}>现在开始你的个性化定制文书服务吧！</div>
      </div>
      <div className={styles.main}>
        <Form<SignupParams> onFinish={onFinished}>
          <SingleInputTextNormal
            label="用户名"
            name={"name"}
            placeholder="请设置您的用户名（可用来登录账号）"
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            rules={[{ required: true, message: "请输入用户名！" }]}
          />
          <SingleInputTextNormal
            label="邮箱"
            name={"email"}
            placeholder="请输入您的邮箱地址（可用来登录账号）"
            type={"email"}
            prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            rules={[{ required: true, message: "请输入邮箱！" }]}
          />
          <Password
            label="密码"
            name={"password"}
            placeholder="请设置您的密码"
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            rules={[{ required: true, message: "请输入密码！" }]}
          />
          <Password
            label="确认密码"
            name={"comfirmPassword"}
            type="password"
            placeholder="请再次输入您的密码"
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            rules={[
              { required: true, message: "请确认密码！" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          />
          <Form.Item>
            <Button
              size="large"
              className={styles.mainLoginBtn}
              htmlType="submit"
              type="primary"
            >
              注册账号
            </Button>
          </Form.Item>
        </Form>
        <span>已有账号？</span>
        <Link to={"/login"}>登录</Link>
      </div>
    </div>
  );
};

export default Signup;
