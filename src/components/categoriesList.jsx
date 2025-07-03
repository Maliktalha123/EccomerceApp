import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { Button, Input, Modal, Table, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const categoriesCollection = collection(db, "categories");
      const snapshot = await getDocs(categoriesCollection);
      const categoriesList = snapshot.docs.map((doc) => ({
        ...doc.data(),
        key: doc.id, // Required by Ant Design Table
      }));
      setCategories(categoriesList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "categories", id));
      setCategories(categories.filter((category) => category.id !== id));
      message.success("Category deleted successfully.");
    } catch (err) {
      message.error("Failed to delete category: " + err.message);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsEditModalVisible(true);
  };

  const handleSave = async () => {
    try {
      const { id, title, desc, price } = editingCategory;
      const categoryRef = doc(db, "categories", id);
      await updateDoc(categoryRef, { title, desc});

      setCategories(
        categories.map((category) =>
          category.id === id ? { ...category, title, desc } : category
        )
      );

      message.success("Category updated successfully.");
      setIsEditModalVisible(false);
    } catch (err) {
      message.error("Failed to update category: " + err.message);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div className="flex gap-5">
          <DeleteOutlined
            className="text-red-600 cursor-pointer"
            onClick={() => handleDelete(record.id)}
          />
          <EditOutlined
            className="text-blue-600 cursor-pointer"
            onClick={() => handleEdit(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={categories} columns={columns} loading={loading} />
      <Modal
        title="Edit category"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsEditModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        <Input
          placeholder="Title"
          value={editingCategory?.title}
          onChange={(e) =>
            setEditingCategory((prev) => ({ ...prev, title: e.target.value }))
          }
          className="mb-3"
        />
        <Input
          placeholder="Description"
          value={editingCategory?.desc}
          onChange={(e) =>
            setEditingCategory((prev) => ({ ...prev, desc: e.target.value }))
          }
          className="mb-3"
        />
        <Input
          placeholder="Price"
          value={editingCategory?.price}
          onChange={(e) =>
            setEditingCategory((prev) => ({ ...prev, price: e.target.value }))
          }
        />
      </Modal>
    </div>
  );
}

export default CategoriesList;
