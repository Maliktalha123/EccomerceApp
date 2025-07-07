import { useContext } from "react";
import { Row, Col } from "antd";
import { ProductContext } from "../context/ProductsContext";
import { CartContext } from "../context/CartContext";
import { FavoriteContext } from "../context/FavoriteContext";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const { products } = useContext(ProductContext);

  const { addItemToCart } = useContext(CartContext);
  const { addItemToFavorite } = useContext(FavoriteContext);


function navigateProduct(product){
console.log(".........",product)
}

  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={[24, 24]}>
        {products.map((product) => (
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
              onQuickView={navigateProduct}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Shop;
