import { collection, getDocs } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { Spin } from "antd";

export const CategoryContext = createContext();

const CategoriesContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsFromDB();
  }, []);

  const getProductsFromDB = async () => {
    try {
      setLoading(true);
      const ref = collection(db, "categories");
      const categoryData = await getDocs(ref);

      if (!categoryData.empty) {
        const allCategories = [];
        categoryData.forEach((category) => {
          allCategories.push({ ...category.data(), id: category.id });
        });
        setCategories(allCategories);
      }
      setLoading(false);
    } catch (err) {
      console.error(err.message);
      setLoading(false);
    }
  };

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
      const { id, title, desc } = editingCategory;
      const categoryRef = doc(db, "categories", id);
      await updateDoc(categoryRef, { title, desc });

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

  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoriesContextProvider;
