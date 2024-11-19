import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Avatar, Button, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Footer from "../components/Footer";

const Profile = () => {
  const { user } = useContext(AuthContext);

  console.log("USer is here ", user);

  return (
    <div 

    
    className="w-full border  bg-slate-400 text-white">
      <div className="flex flex-col mt-10 items-center content-center gap-6">
      
        <Space wrap size={32}>
          <Avatar src={user?.url} size={128} icon={<UserOutlined />} />
        </Space>

        <p>
          Full Name : <span className="text-xl">{user?.name}</span>
        </p>
        <p>
          Email : <span className="text-xl">{user?.email}</span>
        </p>
        <p>
          Number : <span className="text-xl">{user?.number}</span>
        </p>

        <Button variant="dashed" color="danger">Edit Profile</Button>
      </div>

      <Footer/>
    </div>
  );
};

export default Profile;
