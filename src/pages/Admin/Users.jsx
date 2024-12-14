import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Avatar, Image, message, Table } from "antd";
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

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
      render: () => {
        return (
          <div className="flex gap-5">
            <DeleteOutlined className="text-red-600" />
            <EditOutlined className="text-blue-600" />
          </div>
        );
      },
    },
  ];
  return <Table dataSource={users} columns={columns} />;

  return <div className="text-2xl"></div>;
};

export default Users;
