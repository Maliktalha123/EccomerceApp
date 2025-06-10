// import { Button, Form, Input, message } from "antd";
// import { useState } from "react";
// import { auth, db, storage } from "../../utils/firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth/cordova";
// import { doc, setDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// const Signup = () => {
//   const Navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [imageUpload, setImageUpload] = useState(null);

//   const onFinish = async (values) => {
//     setLoading(true);

//     const imagesRef = ref(storage, `prrofileimages/${imageUpload.name}`);
//     try {

//       await uploadBytes(ref(storage, imagesRef), imageUpload).then(
//         (snapshot) => {
//           console.log("Uploaded a blob or file!");
//         }
//       )

//       const user = await createUserWithEmailAndPassword(
//         auth,
//         values.email,
//         values.password
//       );
//       Navigate("/");

//       await getDownloadURL(ref(imagesRef))
//         .then((url) => {
//           console.log("Photos url => ", url);
//           const docRef = doc(db, "users", user.user.uid);
//           setDoc(docRef, { ...values, url, uid: user.user.uid });
//           setLoading(false);
//           message.success("User account created Successfully");
//         })
//         .catch((err) => console.log("Error in getting Url", err));
//     } catch (err) {
//       message.error(err.message);
//       setLoading(false);
//     }
//   };
//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   return (
//     <div className="flex items-center content-center ">
//       <Form
//         name="basic"
//         layout="vertical"
//         labelCol={{
//           span: 8,
//         }}
//         wrapperCol={{
//           span: 16,
//         }}
//         style={{
//           maxWidth: 600,
//           margin: "auto",
//           marginTop: "100px",
//         }}
//         initialValues={{
//           remember: true,
//         }}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         autoComplete="off"
//       >
//         <Form.Item
//           label="Full Name"
//           name="name"
//           rules={[
//             {
//               required: true,
//               message: "Please input your Name!",
//             },
//           ]}
//         >
//           <Input
//             style={{
//               width: "250px",
//             }}
//           />
//         </Form.Item>{" "}
//         <Form.Item
//           label="Ph Number"
//           name="number"
//           rules={[
//             {
//               required: true,
//               message: "Please input your Number!",
//             },
//           ]}
//         >
//           <Input
//             style={{
//               width: "250px",
//             }}
//           />
//         </Form.Item>
//         <Form.Item
//           label="Email"
//           name="email"
//           rules={[
//             {
//               required: true,
//               message: "Please input your email address correctly",
//             },
//           ]}
//         >
//           <Input
//             style={{
//               width: "250px",
//             }}
//           />
//         </Form.Item>
//         <input
//           type="file"
//           onChange={(e) => setImageUpload(e.target.files[0])}
//           placeholder="Upload a File"
//         />
//         <Form.Item
//           label="Password"
//           name="password"
//           rules={[
//             {
//               required: true,
//               message: "Please input your password!",
//             },
//           ]}
//         >
//           <Input.Password
//             style={{
//               width: "250px",
//             }}
//           />
//         </Form.Item>
//         <Form.Item
//           wrapperCol={{
//             offset: 8,
//             span: 16,
//           }}
//           style={{
//             display: "flex",
//             alignItems: "start",
//           }}
//         >
//           <Button
//             type="primary"
//             htmlType="submit"
//             loading={loading}
//             style={{ width: "145px", height: "35px" }}
//           >
//             {loading ? "Creating account..." : "Create Account"}
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default Signup;















import React from "react"
import { Form, Input, Button, Upload, Card, Typography, message } from "antd"
import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined, PlusOutlined } from "@ant-design/icons"

const { Title, Text } = Typography

export default function Signup() {
  const [form] = Form.useForm()
  const [fileList, setFileList] = React.useState([])

  const handleSubmit = (values) => {
    console.log("Form values:", values)
    console.log("Photo:", fileList)
    message.success("Account created successfully!")
  }

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG files!")
      return false
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!")
      return false
    }
    return false // Prevent auto upload
  }

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload Photo</div>
    </button>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card className="shadow-lg">
          <div className="text-center mb-8">
            <Title level={2} className="text-gray-900">
              Create Account
            </Title>
            <Text type="secondary">Join us today! Please fill in your details below.</Text>
          </div>

          <Form form={form} name="signup" onFinish={handleSubmit} layout="vertical" requiredMark={false} size="large">
            <Form.Item
              name="name"
              label="Full Name"
              rules={[
                { required: true, message: "Please enter your full name!" },
                { min: 2, message: "Name must be at least 2 characters!" },
              ]}
            >
              <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please enter your phone number!" },
                {
                  pattern: /^[+]?[1-9][\d]{0,15}$/,
                  message: "Please enter a valid phone number!",
                },
              ]}
            >
              <Input prefix={<PhoneOutlined className="text-gray-400" />} placeholder="Enter your phone number" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input prefix={<MailOutlined className="text-gray-400" />} placeholder="Enter your email address" />
            </Form.Item>

            <Form.Item
              name="photo"
              label="Profile Photo"
              rules={[{ required: true, message: "Please upload your profile photo!" }]}
            >
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleUploadChange}
                beforeUpload={beforeUpload}
                maxCount={1}
                accept="image/*"
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              <Text type="secondary" className="text-xs">
                Upload a clear photo of yourself (JPG/PNG, max 2MB)
              </Text>
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password!" },
                { min: 8, message: "Password must be at least 8 characters!" },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message: "Password must contain uppercase, lowercase and number!",
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
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error("Passwords do not match!"))
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Confirm your password" />
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
              <a href="/login" className="text-blue-600 hover:text-blue-500 font-medium">
                Sign in here
              </a>
            </Text>
          </div>
        </Card>
      </div>
    </div>
  )
}
