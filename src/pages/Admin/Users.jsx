import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { Avatar, Button, Image, Input, message, Modal, Table } from "antd";
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  useEffect(() => {
    getUsersFromDB();
  }, []);

  async function getUsersFromDB() {
    try {
      setLoading(true);
      const ref = collection(db, "users");
      const usersData = await getDocs(ref);
      if (!usersData.empty) {
        const allUsers = [];
        usersData.forEach((user) => {
          allUsers.push({ ...user.data(), id: user.id });
        });
        setUsers([...allUsers]);
        setLoading(false);
      }
    } catch (err) {
      message.error(err.message);
      setLoading(false);
    }
  }

  // Delete user from Firestore
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setUsers(users.filter((user) => user.id !== id));
      message.success("User deleted successfully.");
    } catch (err) {
      message.error("Failed to delete user: " + err.message);
    }
  };

  // Open edit modal
  const handleEdit = (user) => {
    setEditingUser(user);
    setIsEditModalVisible(true);
  };

  // Save edited user data
  const handleSave = async () => {
    try {
      const { id, name, email, number } = editingUser;
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, { name, email, number });
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, name, email, number } : user
        )
      );
      message.success("User updated successfully.");
      setIsEditModalVisible(false);
    } catch (err) {
      message.error("Failed to update user: " + err.message);
    }
  };

  console.log("Users for Admin Panel", users);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Image",
      dataIndex: "url",
      key: "url",
      render: (data) => (
        <Avatar size="large" src={data} icon={<UserOutlined />} />
      ),
    },

    {
      title: "Ph : Number",
      dataIndex: "number",
      key: "number",
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
      <h1 className="text-2xl p-5">All Users</h1>
      <Table dataSource={users} columns={columns} loading={loading} />;
      <Modal
        title="Edit User"
        visible={isEditModalVisible}
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
        record
        <Input
          placeholder="Name"
          value={editingUser?.name}
          onChange={(e) =>
            setEditingUser((prev) => ({ ...prev, name: e.target.value }))
          }
          className="mb-3"
        />
        <Input
          placeholder="Email"
          value={editingUser?.email}
          onChange={(e) =>
            setEditingUser((prev) => ({ ...prev, email: e.target.value }))
          }
          className="mb-3"
        />
        <Input
          placeholder="Phone Number"
          value={editingUser?.number}
          onChange={(e) =>
            setEditingUser((prev) => ({ ...prev, number: e.target.value }))
          }
        />
      </Modal>
    </div>
  );
  return <div className="text-2xl"></div>;
};

export default Users;
