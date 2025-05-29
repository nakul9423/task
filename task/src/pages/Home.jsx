import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <img
        src="/photo.jpg"
        alt="Shopping"
        className="img-fluid rounded shadow"
        style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
      />
      <h1 className="mt-4 fw-bold">Welcome to Our Store</h1>
      <p className="lead">Discover amazing products at great prices!</p>
      <button className="btn btn-primary mt-3" onClick={() => navigate("/products")}>
        Explore Products
      </button>
    </div>
  );
};

export default Home;
