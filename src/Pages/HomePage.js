import React from "react";
import ProductList from "../components/ProductList";

function HomePage() {
  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "1rem" }}>Our Products</h2>
      <ProductList />
    </div>
  );
}

export default HomePage;
