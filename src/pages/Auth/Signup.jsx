import { Button, DatePicker, Form, Input, message } from "antd";
import React, { useState } from "react";
import { auth, db, storage } from "../../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth/cordova";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Signup = () => {
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);

  const onFinish = async (values) => {
    const imagesRef = ref(storage, `prrofileimages/${imageUpload.name}`);

    console.log("Success:", values);
    try {
      setLoading(true);

      await uploadBytes(ref(storage, imagesRef), imageUpload).then(
        (snapshot) => {
          console.log("Uploaded a blob or file!");
        }
      )

      const user = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      Navigate("/");

      await getDownloadURL(ref(imagesRef))
        .then((url) => {
          console.log("Photos url => ", url);
          const docRef = doc(db, "users", user.user.uid);
          setDoc(docRef, { ...values,url, uid: user.user.uid });
          setLoading(false);
          message.success("User account created Successfully");
        })
        .catch((err) => console.log("Error in getting Url", err));
    } catch (err) {
      message.error(err.message);
      setLoading(false);
    }
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
        </Form.Item>{" "}
        <Form.Item
          label="Ph Number"
          name="number"
          rules={[
            {
              required: true,
              message: "Please input your Number!",
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
        <input
          type="file"
          onChange={(e) => setImageUpload(e.target.files[0])}
          placeholder="Upload a File"
        />
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
