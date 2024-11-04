import React, { useState, useEffect } from "react";
import axios from "axios";
import "./viewContent.css";

function ViewContent() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/products");
        setProducts(response.data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching products:", error.message);
      }
    };

    fetchProducts();
  }, []);

 const handleDelete = async (productId) => {
   try {
    console.log(productId);
     await axios.delete(`http://localhost:4000/admin/product/delete-product/${productId}`);
     setProducts(products.filter((product) => product._id !== productId));
   } catch (error) {
     setError(error.message);
     console.error("Error deleting product:", error.message);
   }
 };

  return (
    <div className="content-container">
      <h2>Recipe</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <table className="products-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.title}</td>
               
                <td>
                  <button onClick={() => handleDelete(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewContent;
