import React, { FC, useCallback, useEffect, useState } from "react";
import { Button, Form, Input, notification } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { EmailCodeParams } from "@/models/email-code";
import { useVerifyEmailCode, useForgetPassword } from "@/api/user/user";
import { css } from "@emotion/css";
import { useRecoilState } from "recoil";
import { userState } from "@/stores/user";
import { useCountdown } from "@/pages/common/hooks/useCountdown";
import { Password } from "@/pages/common/components/Form";
import { LockOutlined } from "@ant-design/icons";
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
      margin-bottom: 20px;
    `,
    main: css`
      width: 328px;
      margin: 0 auto;
    `,
    form: css`
      display: flex;
      flex-direction: column;
      gap: 10px;
    `,
    countdown: css`
      text-align: right;
    `,
    otp: css`
      text-align: center;
      margin-bottom: 0px;
      & #vcode {
        width: 100%;
      }
    `,
  };
};

const EmailCode: FC = () => {
  const mutationVerify = useVerifyEmailCode();
  const mutationForget = useForgetPassword();
  const navigate = useNavigate();
  const [user] = useRecoilState(userState);
  const styles = useStyles();
  const [canSendCode, setCanSendCode] = useState<boolean>(false);
  const { time, setTime } = useCountdown(60);

  const sendEmailCode = useCallback(async () => {
    setCanSendCode(false);
    const { result } = await mutationForget.mutateAsync({
      email: user.email,
    });

    if (result === "success") {
      notification.success({ message: "验证码发送成功" });
      setTime(60);
    }
  }, [setTime, mutationForget, user.email]);

  const onFinished = async (form: EmailCodeParams) => {
    const { newpass, vcode } = form;
    const { result } = await mutationVerify.mutateAsync({
      email: user.email,
      newpass: CryptoJS.MD5(newpass).toString(),
      vcode,
    });

    if (result === "success") {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (time === 0) {
      setCanSendCode(true);
    }
  }, [time]);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <span className={styles.title}>输入验证码</span>
        </div>
        <div className={styles.desc}>
          验证码已发送到您的注册邮箱：{user.email}
        </div>
      </div>
      <div className={styles.main}>
        <Form onFinish={onFinished} className={styles.form}>
          <Password
            label="新密码"
            name={"newpass"}
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
                  if (!value || getFieldValue("newpass") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          />
          <Form.Item name="vcode" className={styles.otp}>
            <Input.OTP size="large" />
          </Form.Item>
          <div className={styles.countdown}>
            {canSendCode ? (
              <a onClick={sendEmailCode}>重新发送验证码</a>
            ) : (
              <span>重新发送验证码：{time}</span>
            )}
          </div>
          <Form.Item>
            <Button
              size="large"
              className={styles.mainLoginBtn}
              htmlType="submit"
              type="primary"
            >
              提交
            </Button>
          </Form.Item>
        </Form>
        <Link to={"/forget-password"}>回到输入邮箱页面</Link>
      </div>
    </div>
  );
};

export default EmailCode;
