import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product, addToCart }) => {
    
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            className="card-img-top p-3"
            alt={product.title}
            style={{ height: "300px", objectFit: "contain" }}
          />
        </Link>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text fw-bold text-primary">${product.price}</p>
          <p className="card-text text-muted">
            Rating: {product.rating.rate} ⭐ ({product.rating.count} reviews)
          </p>
          <button
            className="btn btn-success mt-auto"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
