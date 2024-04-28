import React, { FC, useCallback, useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { ForgetPasswordParams } from "@/models/forget-password";
import { useForgetPassword } from "@/api/user/user";
import { css } from "@emotion/css";
import { useRecoilState } from "recoil";
import { userState } from "@/stores/user";
import { useCountdown } from "@/pages/common/hooks/useCountdown";

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
    `,
  };
};

const EmailCode: FC = () => {
  const mutation = useForgetPassword();
  const navigate = useNavigate();
  const [user] = useRecoilState(userState);
  const styles = useStyles();
  const [canSendCode, setCanSendCode] = useState<boolean>(false);
  const { time } = useCountdown(10);

  const sendEmailCode = useCallback(() => {
    setCanSendCode(false);
  }, []);

  const onFinished = async (form: ForgetPasswordParams) => {
    const result = await mutation.mutateAsync(form);

    if (result.status) {
      navigate("/emailCode");
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
          <Form.Item name="otp" className={styles.otp}>
            <Input.OTP size="large" rootClassName={styles.otp} />
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
            ></Button>
          </Form.Item>
        </Form>
        <Link to={"/forget-password"}>回到输入邮箱页面</Link>
      </div>
    </div>
  );
};

export default EmailCode;
