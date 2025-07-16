import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";
import { AuthContext } from "../context/AuthContext";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
    } else {
      axios
        .post(
          "http://localhost:5000/api/carts/add",
          { productId: product._id },
          {
            withCredentials: true,
          }
        )
        .then(() => alert("Added to cart"))
        .catch((err) => console.error(err));
    }
  };

  if (!product) return <p>Loading...</p>;

  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <span key={i} className="star filled">
            ★
          </span>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <span key={i} className="star half">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="star">
            ★
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="product-detail-container">
      <img src={product.imageUrl} alt={product.name} />
      <div className="product-info">
        <h2>{product.name}</h2>

        {/* Price */}
        <p className="price">₹{product.price}</p>

        {/* Rating display */}
        <div className="product-rating">
          <div className="stars">
            {renderStars(product.averageRating)}
            <span className="rating-value">
              {product.averageRating.toFixed(1)} ({product.totalRatings}{" "}
              ratings)
            </span>
          </div>
          <span className="out-of">out of {product.outOf5}</span>
        </div>

        {/* Description */}
        <p className="description">{product.description}</p>

        {/* Category */}
        <p className="category">Category: {product.category}</p>

        {/* Stock information */}
        <p className="stock">
          {product.quantity > 0
            ? `In Stock (${product.quantity} available)`
            : "Out of Stock"}
        </p>

        <button onClick={handleAddToCart} disabled={product.quantity <= 0}>
          {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
