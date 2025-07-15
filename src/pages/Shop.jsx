import { useContext } from "react";
import { Row, Col } from "antd";
import { ProductContext } from "../context/ProductsContext";
import { FavoriteContext } from "../context/FavoriteContext";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import PageLocation from "../components/PageLocation";

const Shop = () => {
  const { products } = useContext(ProductContext);

  const { addItemToCart } = useContext(CartContext);
  const { addItemToFavorite } = useContext(FavoriteContext);

  return (
    <>
      <PageLocation page="Shop" />
      <div style={{ padding: "24px" }}>
        <Row gutter={[24, 24]} justify="center">
          {products.map((product) => (
            <Col
              key={product.id}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              xl={6}
              style={{
                display: "flex",
                justifyContent: "center", // ⭐️ Important
              }}
            >
              <ProductCard
                product={product}
                onAddToCart={addItemToCart}
                onWishlist={addItemToFavorite}
              />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default Shop;
