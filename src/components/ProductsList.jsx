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
import { ProductContext } from "../context/ProductsContext";

function ProductsList() {
  const { products, setProducts } = useContext(ProductContext);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts(products.filter((product) => product.id !== id));
      message.success("product deleted successfully.");
    } catch (err) {
      message.error("Failed to delete product: " + err.message);
    }
  };

  const handleEdit = (product) => {
    console.log(product)
    setEditingProduct(product);
    setIsEditModalVisible(true);
  };

  const handleSave = async () => {
   
    try {
      const { id, title, desc, price } = editingProduct;
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, { title, desc, price });
      setProducts(
        products.map((product) =>
          product.id === id ? { ...product, title, desc, price } : product
        )
      );
      message.success("product updated successfully.");
      setIsEditModalVisible(false);
    } catch (err) {
      message.error("Failed to update product: " + err.message);
    }
  };


  console.log("Products => ", products);
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
      <Table dataSource={products} columns={columns} loading={loading} />;
      <Modal
        title="Edit Product"
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
        record
        <Input
          placeholder="Title"
          value={editingProduct?.title}
          onChange={(e) =>
            setEditingProduct((prev) => ({ ...prev, title: e.target.value }))
          }
          className="mb-3"
        />
        <Input
          placeholder="Description"
          value={editingProduct?.desc}
          onChange={(e) =>
            setEditingProduct((prev) => ({ ...prev, desc: e.target.value }))
          }
          className="mb-3"
        />
        <Input
          placeholder="Phone Number"
          value={editingProduct?.price}
          onChange={(e) =>
            setEditingProduct((prev) => ({ ...prev, price: e.target.value }))
          }
        />
      </Modal>
    </div>
  );
}
export default ProductsList;
