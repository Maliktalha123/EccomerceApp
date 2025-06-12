import { Form, Input, Button, Upload, Card, Typography, message, Spin } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../../utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const { Title, Text } = Typography;

export default function Signup() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;

      const docRef = doc(db, "users", user.uid);

      await setDoc(docRef, {
        ...values,
        uid: user.uid,
      });

      message.success("Account created successfully!");
      navigate("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Signup error:", error);
      message.error("Something went wrong. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  } else
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Card className="shadow-lg">
            <div className="text-center mb-8">
              <Title level={2} className="text-gray-900">
                Create Account
              </Title>
              <Text type="secondary">
                Join us today! Please fill in your details below.
              </Text>
            </div>

            <Form
              form={form}
              name="signup"
              onFinish={handleSubmit}
              layout="vertical"
              requiredMark={false}
              size="large"
            >
              <Form.Item
                name="name"
                label="Full Name"
                rules={[
                  { required: true, message: "Please enter your full name!" },
                  { min: 2, message: "Name must be at least 2 characters!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="Enter your full name"
                />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number!",
                  },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined className="text-gray-400" />}
                  placeholder="Enter your phone number"
                />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="text-gray-400" />}
                  placeholder="Enter your email address"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters!",
                  },
                  {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message:
                      "Password must contain uppercase, lowercase and number!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Create a strong password"
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Confirm your password"
                />
              </Form.Item>

              <Form.Item className="mb-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full h-12 text-base font-medium"
                  style={{ backgroundColor: "#1890ff" }}
                >
                  Create Account
                </Button>
              </Form.Item>
            </Form>

            <div className="text-center mt-6">
              <Text type="secondary">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Sign in here
                </a>
              </Text>
            </div>
          </Card>
        </div>
      </div>
    );
}
