import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth/cordova";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";


const Signin = () => {
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    setLoading(true)
    
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        message.success("Logged Inn successfully...")
        
        Navigate("/");
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        const errorCode = error.code;
        const errorMessage = error.message;
        message.error(errorMessage)
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleSignin = async () => { };

  return (
    <div className="flex items-center content-center ">
      <Form
        name="basic"
        layout="vertical"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
          margin: "auto",
          marginTop: "100px",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            style={{
              width: "250px",
            }}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            style={{
              width: "250px",
            }}
          />
        </Form.Item>
        <Link to={"/signup"}>
          <p className=" text-blue-700 text-center m-auto">I haven't account</p>
        </Link>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
          style={{
            display: "flex",
            alignItems: "start",
          }}
        >

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={
              
              { width: "145px", height: "35px", marginTop: "5px" 
              
            }}
          >
            {loading ? "Signing In..." : "Login"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Signin;
