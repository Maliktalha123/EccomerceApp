// src/components/CategoriesForProduct.jsx
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../context/CategoriesContext";

function CategoriesForProduct() {
  const { categories } = useContext(CategoryContext);
  const navigate = useNavigate();

  // Sirf pehli 6 categories dikhani hain
  const previewCategories = categories.slice(0, 6);

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <div className="flex flex-wrap gap-3">
        {previewCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => navigate(`/category/${cat.id}`)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {cat.title}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <button
          onClick={() => navigate("/categories")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          View All Categories
        </button>
      </div>
    </div>
  );
}

export default CategoriesForProduct;
