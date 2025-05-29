import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/cart")
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cart:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container mt-5">Loading...</div>;

  if (cartItems.length === 0)
    return <div className="container mt-5">Cart is empty</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Cart</h2>
      <div className="row">
        {cartItems.map((item) => (
          <div key={item._id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={item.image}
                alt={item.title}
                className="card-img-top p-3"
                style={{ height: "300px", objectFit: "contain" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text fw-bold">${item.price}</p>
                <p className="card-text">Qty: {item.quantity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
