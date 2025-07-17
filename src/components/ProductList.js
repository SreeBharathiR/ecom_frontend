import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProductList.css";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="product-grid">
      {products?.map((product) => (
        <div className="product-card" key={product._id}>
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}${product.imageUrl}`}
            alt={product.name}
          />
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
          <Link to={`/product/${product._id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
