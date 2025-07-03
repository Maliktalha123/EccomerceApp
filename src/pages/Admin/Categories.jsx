import React, { useState } from "react";
import { Button, Drawer } from "antd";
import AddProductDrawer from "../../components/AddProductDrawer";
import CategoriesList from "../../components/categoriesList";
import AddCategoryDrawer from "../../components/AddCategory";

function Products() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="flex justify-around p-5">
        <h1 className="text-2xl">All Products</h1>
        <Button type="primary" onClick={showDrawer}>
          Add Product
        </Button>
      </div>

      <AddCategoryDrawer onClose={onClose} open={open} />

      <CategoriesList />
    </div>
  );
}

export default Products;
