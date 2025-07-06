// src/components/ProductByCategory.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";

function ProductByCategory() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Fetch category title
        const catDocRef = doc(db, "categories", id);
        const catDocSnap = await getDoc(catDocRef);
        if (catDocSnap.exists()) {
          setCategoryTitle(catDocSnap.data().title);
        }

        // Fetch products for this category
        const productsRef = collection(db, "products");
        const q = query(productsRef, where("category", "==", id));
        const snapshot = await getDocs(q);

        const productsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Products in "{categoryTitle}"</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-3 rounded shadow">
              <img
                src={product.url}
                alt={product.title}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="font-medium">{product.title}</h3>
              <p>{product.desc}</p>
              <p className="font-semibold">Rs. {product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductByCategory;
