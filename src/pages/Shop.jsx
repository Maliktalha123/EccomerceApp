import { useState, useContext, useEffect } from "react";
import { Row, Col, Button, Space } from "antd";
import { ProductContext } from "../context/ProductsContext";
import { CartContext } from "../context/CartContext";
import { FavoriteContext } from "../context/FavoriteContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const { products } = useContext(ProductContext);
  const { addItemToCart } = useContext(CartContext);
  const { addItemToFavorite } = useContext(FavoriteContext);

  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  // Fetch categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      const snapshot = await getDocs(collection(db, "categories"));
      const catList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCategories(catList);
    };
    fetchCategories();
  }, []);

  // Filter products based on selected category
  const filteredProducts = selectedCategoryId
    ? products.filter((p) => p.categoryId === selectedCategoryId)
    : products;

  return (
    <div style={{ padding: "24px" }}>
      {/* Categories filter */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <Space wrap>
          <Button
            type={!selectedCategoryId ? "primary" : "default"}
            onClick={() => setSelectedCategoryId("")}
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.id}
              type={selectedCategoryId === cat.id ? "primary" : "default"}
              onClick={() => setSelectedCategoryId(cat.id)}
            >
              {cat.name}
            </Button>
          ))}
        </Space>
      </div>

      {/* Products grid */}
      <Row gutter={[24, 24]}>
        {filteredProducts.map((product) => (
          <Col
            key={product.id}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            xl={6}
            style={{ display: "flex" }}
          >
            <ProductCard
              product={product}
              onAddToCart={addItemToCart}
              onWishlist={addItemToFavorite}
              onQuickView={() => console.log(product)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Shop;
