import { Drawer, Button, Form, Input, message } from "antd";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

function AddCategoryDrawer({ open, onClose }) {
  const [imageUpload, setImageUpload] = useState(null);

  const [form] = useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const newDocRef = doc(collection(db, "categories"));
      const categoryData = {
        id: newDocRef.id,
        title: values.title,
        desc: values.desc,
        createdAt: new Date(),
      };

await setDoc(newDocRef, categoryData);

      form.resetFields();
      setLoading(false);
      onClose();
      message.success("Category ADDED Successfully");
    } catch (err) {
      message.error(err.message);
      console.log("Error => ", err);
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
          label="Category Name"
          name="title"
          rules={[
            {
              required: true,
              message: "Please input your category name!",
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
              message: "Please input your category Description",
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
            Save Category
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default AddCategoryDrawer;
