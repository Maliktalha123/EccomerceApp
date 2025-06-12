import { useState } from "react"
import { Form, Input, Button, Card, Checkbox, Typography, Space, Divider, message, Spin } from "antd"
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
  LockOutlined,
  ArrowRightOutlined,
  LoadingOutlined,
} from "@ant-design/icons"
import { auth } from "../../utils/firebase"
import { signInWithEmailAndPassword } from "firebase/auth/cordova"
import { useNavigate } from "react-router-dom"

const { Title, Text, Link } = Typography

export default function Signin() {
  const Navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
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

    } catch (error) {
      message.error("Login failed!")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    )
  }
  else return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.4; }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 25%, #e0e7ff 50%, #c7d2fe 100%);
          padding: 20px;
          position: relative;
          overflow: hidden;
        }
        
        .background-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          mix-blend-mode: multiply;
        }
        
        .orb-1 {
          top: -160px;
          right: -160px;
          width: 320px;
          height: 320px;
          background: #a855f7;
          animation: pulse 4s ease-in-out infinite, float 6s ease-in-out infinite;
        }
        
        .orb-2 {
          bottom: -160px;
          left: -160px;
          width: 320px;
          height: 320px;
          background: #3b82f6;
          animation: pulse 4s ease-in-out infinite 2s, float 8s ease-in-out infinite reverse;
        }
        
        .orb-3 {
          top: 160px;
          left: 160px;
          width: 320px;
          height: 320px;
          background: #6366f1;
          animation: pulse 4s ease-in-out infinite 1s, float 7s ease-in-out infinite;
        }
        
        .login-card {
          width: 100%;
          max-width: 400px;
          position: relative;
          z-index: 10;
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.9);
          border: none;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          animation: zoomIn 0.6s ease-out;
        }
        
        .logo-container {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #a855f7, #3b82f6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          animation: zoomIn 0.8s ease-out 0.2s both;
        }
        
        .title {
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-align: center;
          margin-bottom: 8px !important;
          animation: slideInUp 0.8s ease-out 0.3s both;
        }
        
        .subtitle {
          text-align: center;
          color: #6b7280;
          margin-bottom: 32px !important;
          animation: slideInUp 0.8s ease-out 0.4s both;
        }
        
        .form-item-email {
          animation: slideInLeft 0.8s ease-out 0.5s both;
        }
        
        .form-item-password {
          animation: slideInRight 0.8s ease-out 0.6s both;
        }
        
        .form-item-options {
          animation: slideInUp 0.8s ease-out 0.7s both;
        }
        
        .login-button {
          height: 48px;
          background: linear-gradient(135deg, #7c3aed, #2563eb);
          border: none;
          font-weight: 600;
          animation: slideInUp 0.8s ease-out 0.8s both;
          transition: all 0.3s ease;
        }
        
        .login-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(124, 58, 237, 0.3);
          background: linear-gradient(135deg, #6d28d9, #1d4ed8);
        }
        
        .login-button:active {
          transform: translateY(0);
        }
        
        .divider-container {
          animation: fadeIn 0.8s ease-out 0.9s both;
        }
        
        .social-buttons {
          animation: slideInUp 0.8s ease-out 1s both;
        }
        
        .social-button {
          height: 48px;
          transition: all 0.3s ease;
        }
        
        .social-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }
        
        .signup-link {
          text-align: center;
          animation: fadeIn 0.8s ease-out 1.1s both;
        }
        
        .ant-input-affix-wrapper {
          height: 48px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        
        .ant-input-affix-wrapper:hover {
          border-color: #a855f7;
          box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.1);
        }
        
        .ant-input-affix-wrapper-focused {
          border-color: #a855f7;
          box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.2);
        }
        
        .loading-icon {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="login-container">
        {/* Background decorations */}
        <div className="background-orb orb-1"></div>
        <div className="background-orb orb-2"></div>
        <div className="background-orb orb-3"></div>

        <Card className="login-card">
          <div style={{ padding: "24px 0" }}>
            {/* Logo and Header */}
            <div className="logo-container">
              <LockOutlined style={{ color: "white", fontSize: "24px" }} />
            </div>

            <Title level={2} className="title">
              Welcome Back
            </Title>

            <Text className="subtitle">Sign in to your account to continue</Text>

            {/* Login Form */}
            <Form form={form} name="login" onFinish={onFinish} layout="vertical" size="large">
              <Form.Item
                name="email"
                label="Email"
                className="form-item-email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input prefix={<MailOutlined style={{ color: "#9ca3af" }} />} placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                className="form-item-password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  { min: 6, message: "Password must be at least 6 characters!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: "#9ca3af" }} />}
                  placeholder="Enter your password"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>

              <Form.Item className="form-item-options">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <Link href="#" style={{ color: "#7c3aed" }}>
                    Forgot password?
                  </Link>
                </div>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-button"
                  loading={loading}
                  block
                  icon={loading ? <LoadingOutlined className="loading-icon" /> : <ArrowRightOutlined />}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </Form.Item>
            </Form>

            {/* Divider */}
            <div className="divider-container">
              <Divider>
                <Text type="secondary" style={{ fontSize: "12px", textTransform: "uppercase" }}>
                  Or continue with
                </Text>
              </Divider>
            </div>


            {/* Sign Up Link */}
            <div className="signup-link" style={{ marginTop: "24px" }}>
              <Text type="secondary">
                Don't have an account?{" "}
                <Link href="/signup" style={{ color: "#7c3aed", fontWeight: 600 }}>
                  Sign up
                </Link>
              </Text>
            </div>
          </div>
        </Card>
      </div>

    </>

  )
}
