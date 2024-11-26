import { Image, Table, message } from "antd";
import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ProductContext } from "../context/ProductsContext";

function ProductsList() {
  const { products, setProducts } = useContext(ProductContext);

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
      title: "Image",
      dataIndex: "url",
      key: "url",
      render: (data) => <Image src={data} height={50} width={50} />,
    },
    {
      title: "Discription",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
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
  return <Table dataSource={products} columns={columns} />;
}

export default ProductsList;
