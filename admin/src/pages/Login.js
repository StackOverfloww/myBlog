import React, { useState } from "react";
import { Card, Input, Button, Spin, message } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import "../static/css/Login.css";
import axios from "axios";
import servicePath from "../config/apiUrl";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const checkLogin = async () => {
    setIsLoading(true);

    if (!userName) {
      message.error("用户名不能为空");
      return false;
    } else if (!password) {
      message.error("密码不能为空");
      return false;
    }
    const dataProps = {
      userName: userName,
      password: password,
    };

    try {
      const res = await axios({
        method: "post",
        url: servicePath.checkLogin,
        data: dataProps,
        withCredentials: true,
      });
      //console.log("res:", res);
      if (res) {
        setIsLoading(false);
        const { code, openId } = res.data;
        if (code === 200) {
          localStorage.setItem("openId", openId);
          navigate("/index");
          message.success("登陆成功");
        } else {
          message.error("账号密码错误");
        }
      }
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-div">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card
          title="JSPang Blog  System"
          bordered={true}
          style={{ width: 400 }}
        >
          <Input
            id="userName"
            size="large"
            placeholder="Enter your userName"
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <br />
          <br />
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={<KeyOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <Button type="primary" size="large" block onClick={checkLogin}>
            Login in
          </Button>
        </Card>
      </Spin>
    </div>
  );
}
export default Login;
