import { Button, DatePicker, Form, Input } from "antd";

import React from "react";
import { auth } from "../../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth/cordova";

const Signup = () => {
  
  const onFinish = (values) => {
    
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
       
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
          label="Full Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your Name!",
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
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email address correctly",
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
        <Form.Item label="DatePicker" name="date">
          <DatePicker />
        </Form.Item>

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
            style={{ width: "145px", height: "35px" }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
