import React, { useState, useEffect } from "react";
import axios from "axios";
import "./content.css";

function Content() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/products");
        setProducts(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    const product = products.find((p) => p._id === productId);
    setSelectedProduct(product);
  };

  return (
    <div className="content-container">
      <h2>Products</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li
              key={product._id}
              onClick={() => handleProductClick(product._id)}
            >
              <h3>{product.title}</h3>
              {selectedProduct?._id === product._id && (
                <div>
                  <p>Description: {product.description}</p>
                  <p>
                    Ingredients:{" "}
                    {product.ingredients
                      .map(
                        (ingredient) =>
                          `${ingredient.name}: ${ingredient.quantity} ${ingredient.unit}`
                      )
                      .join(", ")}
                  </p>
                  {/* Add other product details here */}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Content;
