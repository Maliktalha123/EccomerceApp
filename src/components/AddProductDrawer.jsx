import {
  Drawer,
  Button,
  Checkbox,
  Radio,
  Form,
  Input,
  message,
  Upload,
} from "antd";

import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";
import { db, auth, storage } from "../utils/firebase";
import { UploadOutlined } from "@ant-design/icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function AddProductDrawer({ open, onClose }) {
  const [imageUpload, setImageUpload] = useState(null);

  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    // console.log("Success:", values);
    // console.log(values);
    // console.log(imageUpload);

    const imagesRef = ref(storage, `images/${imageUpload.name}`);

    try {
      setLoading(true);

      await uploadBytes(ref(storage, imagesRef), imageUpload).then(
        (snapshot) => {
          console.log("Uploaded a blob or file!");
        }
      );

      await getDownloadURL(ref(imagesRef))
        .then((url) => {
          // console.log("Photos url => ", url);
          const ref = collection(db, "products");
          addDoc(ref, { ...values, url });
        })
        .catch((err) => console.log("Error in getting Url", err));

      form.resetFields();
      setLoading(false);
      onClose();
      message.success("Product ADDED Successfully");
    } catch (err) {
      message.error(err.message);
      setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Drawer title="Product Form" width={800} onClose={onClose} open={open}>
      <Form
        name="basic"
        form={form}
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please input Category!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product Name"
          name="title"
          rules={[
            {
              required: true,
              message: "Please input your product name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product Desc"
          name="desc"
          rules={[
            {
              required: true,
              message: "Please input your product Description",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Uplaoad Photo" name="image">
          <input
            type="file"
            onChange={(e) => setImageUpload(e.target.files[0])}
            placeholder="Upload a File"
          />
          {/* <button>Save Image</button> */}
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input price",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button loading={loading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default AddProductDrawer;
