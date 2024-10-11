import React from "react";
import { Button, Form, Input, InputNumber } from "antd";
const FormForContacts = () => {
  const layoutt = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Form
      name="nest-messages"
      layout="vertical"
      onFinish={onFinish}
      style={{
        maxWidth: 600,

        width: "350px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={["user", "name"]}
        label="Your Name"
        rules={[
          {
            required: true,
          },
        ]}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Input maxLength={30} />
      </Form.Item>
      <Form.Item name={["user", "email"]} label="Email">
        <Input maxLength={30} />
      </Form.Item>

      <Form.Item
        name={["user", "subject"]}
        label="Subject"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input maxLength={100} size="large" />
      </Form.Item>
      <Form.Item
        name={["user", "Message"]}
        label="Message"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          ...layoutt.wrapperCol,
          offset: 8,
        }}
        style={{
          display: "flex",
          alignItems: "start",
        }}
      >
        <Button
          type="primary"
          htmlType="submit"
          style={{
            backgroundColor: "#B88E2F",
            width: "170px",
            fontSize: "16px",
          }}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormForContacts;
