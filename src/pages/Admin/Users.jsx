import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { message, Table } from "antd";

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
        console.log("All Users => ", allUsers)
        setUsers( [...allUsers]);
        console.log("Users",users);
        setLoading(false);

      }
    } catch (err) {
      message.error(err.message);
      setLoading(false);
    }
  }

// getUsersFromDB()
console.log("Users for Admin Panel",users)  
// const columns = [
//     {
//       title: "Name",
//       dataIndex: "title",
//       key: "title",
//     },
//     {
//       title: "Image",
//       dataIndex: "url",
//       key: "url",
//       render: (data) => <Image src={data} height={50} width={50} />,
//     },
//     {
//       title: "Discription",
//       dataIndex: "desc",
//       key: "desc",
//     },
//     {
//       title: "Price",
//       dataIndex: "price",
//       key: "price",
//     },

//     {
//       title: "Action",
//       key: "action",
//       render: () => {
//         return (
//           <div className="flex gap-5">
//             <DeleteOutlined className="text-red-600" />
//             <EditOutlined className="text-blue-600" />
//           </div>
//         );
//       },
//     },
//   ];
//   return <Table dataSource={products} columns={columns} />;

//   return <div className="text-2xl"></div>;
};

export default Users;
