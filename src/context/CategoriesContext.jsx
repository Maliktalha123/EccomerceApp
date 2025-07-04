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

  return (
    <CategoryContext.Provider value={{ categories }}>
      {loading ? (
        <div
          className="flex h-screen justify-center items-center"
        >
          <Spin />
        </div>
      ) : (
        children
      )}
    </CategoryContext.Provider>
  );
};
 
export default CategoriesContextProvider