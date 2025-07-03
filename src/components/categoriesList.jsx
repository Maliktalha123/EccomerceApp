import { Button, Image, Input, Modal, Table, message } from "antd";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { CategoryContext } from "../context/CategoriesContext";

function CategoriesList() {
  const { Categories, setCategories } = useContext(CategoryContext);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "categories", id));
      setCategories(Categories.filter((category) => category.id !== id));
      message.success("category deleted successfully.");
    } catch (err) {
      message.error("Failed to delete category: " + err.message);
    }
  };

  const handleEdit = (category) => {
    console.log(category);
    setEditingCategory(category);
    setIsEditModalVisible(true);
  };

  const handleSave = async () => {
    try {
      const { id, title, desc } = editingCategory;
      const categoryRef = doc(db, "categories", id);
      await updateDoc(categoryRef, { title, desc });
      setCategories(
        Categories.map((category) =>
          category.id === id ? { ...category, title, desc } : category
        )
      );
      message.success("category updated successfully.");
      setIsEditModalVisible(false);
    } catch (err) {
      message.error("Failed to update category: " + err.message);
    }
  };

  console.log("Categories => ", Categories);
  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Discription",
      dataIndex: "desc",
      key: "desc",
    },

    {
      title: "Action",
      key: "action",
      render: (record) => {
        return (
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
        );
      },
    },
  ];
  return (
    <div>
      <Table dataSource={Categories} columns={columns} loading={loading} />;
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
