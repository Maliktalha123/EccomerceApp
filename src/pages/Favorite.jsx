// import React, { useContext } from "react";
// import { FavoriteContext } from "../context/FavoriteContext";
// import { Button, Card } from "antd";
// import Meta from "antd/es/card/Meta";
// import { HeartFilled, HeartOutlined } from "@ant-design/icons";

// const Favorite = () => {
//   const { favoriteItems, removeItemFromFavorite } = useContext(FavoriteContext);
//   console.log(favoriteItems);

//   return (
//     <div
//       className="flex gap-4"
//       style={{ flexWrap: "wrap", justifyContent: "center", textAlign: "start" }}
//     >
//       {favoriteItems.map((data) => {
//         let discription = data.desc;

//         return (
//           <Card
//             key={data.id}
//             hoverable
//             style={{
//               width: 270,
//               height: 400,
//             }}
//             cover={
//               <img
//                 style={{
//                   height: 200,
//                 }}
//                 alt="example"
//                 src={data.url}
//               />
//             }
//           >
//             <Meta
//               title={data.title}
//               description={`${discription.slice(0, 60)}...see more`}
//             />

//             <div className="flex mt-4 gap-4 ">
//               <p className="text-2xl">{`$${data.price}`}</p>
//               <div className="flex gap-2">
//                 <Button
//                   type="text"
//                   icon={<HeartFilled />}
//                   onClick={() => removeItemFromFavorite(data.id)}
//                 />

//                 <Button className="my-2" onClick={() => addItemToCart(data)}>
//                   Add to Cart
//                 </Button>
//               </div>
//             </div>
//           </Card>
//         );
//       })}
//     </div>
//   );
// };

// export default Favorite;

import { useContext } from "react";
import { Row, Col } from "antd";
import { ProductContext } from "../context/ProductsContext";
import { CartContext } from "../context/CartContext";
import { FavoriteContext } from "../context/FavoriteContext";
import ProductCard from "../components/ProductCard";

const Favorite = () => {
  const { products } = useContext(ProductContext);

  const { addItemToCart } = useContext(CartContext);
  const {
    favoriteItems,
    addItemToFavorite,
    isItemAddedInFavorites,
    removeItemFromFavorite,
  } = useContext(FavoriteContext);

  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={[24, 24]}>
        {favoriteItems.map((product) => (
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
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Favorite;
