import { message } from "antd";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";

const Soldout = () => {
  useEffect(() => {
    getSoldOutsFromDB();
  }, []);
  const [loading, setLoading] = useState(false);
  const [sales, setSales] = useState([]);

  const getSoldOutsFromDB = async () => {
    try {
      setLoading(true);
      const ref = collection(db, "sales");
      const salesData = await getDocs(ref);
      console.log("I am here.....", salesData);
      if (!salesData.empty) {
        const allSales = [];
        salesData.forEach((product) => {
          allSales.push({ ...product.data(), id: product.id });
        });
        setSales([...allSales]);
        setLoading(false);
      }
    } catch (err) {
      message.error(err.message);
      setLoading(false);
    }
  };
  console.log(sales);
  return (
    <div>
      {sales.map((data) => {
        return (
          <div>
            <div>{data.soldItems[0].category}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Soldout;
