import React from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};
const onFinish = (values) => {
  console.log("Received values of form: ", values);
};
const CheckOutForm = () => {
  const [form] = Form.useForm();
  return (
    <div className="ml-12">
      <Form
        onFinish={onFinish}
        {...formItemLayout}
        form={form}
        variant={"outlined"}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          variant: "outlined",
        }}
        layout="vertical"
      >
        <Form.Item
          style={{
            marginBottom: 0,
          }}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
            }}
          >
            <Input placeholder="Input first Name" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px",
            }}
          >
            <Input placeholder="Input last Name" />
          </Form.Item>
        </Form.Item>

        <Form.Item
          label="Email address"
          name="email"
          placeholder="Enter Your Email"
          rules={[
            {
              required: true,
              message: "Please input Email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Company Name(optional)"
          name="companyName"
          placeholder="Enter Company Name"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Country / Region"
          placeholder="Enter Your Country"
          name="Select"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <Select>
            <Select.Option value="pakistan">Pakistan</Select.Option>
            {/* <Select.Option value="india">India</Select.Option>
            <Select.Option value="america">U.S.A</Select.Option>
            <Select.Option value="saudiaArabia">Saudia Arabia</Select.Option>
            <Select.Option value="dubai">U.A.E</Select.Option>
            <Select.Option value="italy">Italy</Select.Option> */}
          </Select>
        </Form.Item>
        <Form.Item
          label="Street Address"
          name="streetAddress"
          placeholder="Enter Street Address"
          rules={[
            {
              required: true,
              message: "Please input address!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="City / Town"
          placeholder="Enter city"
          name="city"
          rules={[
            {
              required: true,
              message: "Please input City!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Province"
          name="SelectProvince"
          placeholder="Enter Your Province"
          rules={[
            {
              required: true,
              message: "Please Select Your Province",
            },
          ]}
        >
          <Select>
            <Select.Option value="sindh">Sindh</Select.Option>
            <Select.Option value="punjab">Punjab</Select.Option>
            <Select.Option value="balochistan">Balochistan</Select.Option>
            <Select.Option value="kpk">Khyber Pakhtoon Khwa</Select.Option>
            <Select.Option value="kashmir">Kashmir</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          placeholder="Enter Your PH:Number"
          rules={[
            {
              required: true,
              message: "Please input Phone Number!",
            },
          ]}
        >
          <InputNumber
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          label="Report"
          name="report"
          placeholder="Enter here, if you have any complain about us"
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default CheckOutForm;
