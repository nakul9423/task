import React, { useEffect, useState } from "react";
import Product from "../components/Product";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
    //   console.log(res)
  }, []);
  console.log(products)
const handleAddToCart = async (product) => {
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

  return (
    <div className="container mt-5">
      <h2 className="mb-4">All Products</h2>
      <div className="row">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            addToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
