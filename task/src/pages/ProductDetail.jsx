import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);
  const addToCart = async (product) => {
  try {
    const response = await fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      }),
    });

    if (!response.ok) throw new Error("Failed to add to cart");

    const data = await response.json();
    console.log("Added to cart:", data);
    alert("Product added to cart!");
  } catch (error) {
    console.error("Add to cart error:", error);
    alert("Failed to add to cart");
  }
};


  if (!product) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{ maxHeight: "500px", objectFit: "contain" }}
          />
        </div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p className="text-muted">{product.category}</p>
          <h4 className="text-primary">${product.price}</h4>
          <p>{product.description}</p>
          <p>
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

export default ProductDetail;
