// src/components/CategoriesForProducts.jsx
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../context/CategoriesContext";

function CategoriesForProducts() {
  const { categories } = useContext(CategoryContext);
  const navigate = useNavigate();

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">All Categories</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => navigate(`/category/${cat.id}`)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {cat.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoriesForProducts;
