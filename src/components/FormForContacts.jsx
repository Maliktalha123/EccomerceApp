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
      onFinish={onFinish}
      className="flex flex-col gap-4"
      style={{ width: "100%" }}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={["user", "name"]}
        label="Your Name"
        rules={[{ required: true }]}
      >
        <Input maxLength={30} />
      </Form.Item>

      <Form.Item name={["user", "email"]} label="Email">
        <Input maxLength={30} />
      </Form.Item>

      <Form.Item
        name={["user", "subject"]}
        label="Subject"
        rules={[{ required: true }]}
      >
        <Input maxLength={100} />
      </Form.Item>

      <Form.Item
        name={["user", "Message"]}
        label="Message"
        rules={[{ required: true }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item>
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
