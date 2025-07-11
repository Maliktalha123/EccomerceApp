import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Row, Col } from "antd";
import { ProductContext } from "../context/ProductsContext";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";
import { FavoriteContext } from "../context/FavoriteContext";

const ProductByCategory = () => {
  const { id } = useParams(); // Category ID
  const { products } = useContext(ProductContext);
  const { addItemToCart } = useContext(CartContext);
  const { addItemToFavorite } = useContext(FavoriteContext);
console.log("Param => ", id)
  // Filter products by category
  const filteredProducts = products.filter(
    (p) => {
      console.log("P",p.category)

    return  p.category === id
    }
  );

  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Products in this Category</h2>
      <Row gutter={[24, 24]}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
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
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </Row>
    </div>
  );
};

export default ProductByCategory;
