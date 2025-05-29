const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/cartdb", { useNewUrlParser: true, useUnifiedTopology: true });

const cartItemSchema = new mongoose.Schema({
  productId: Number,
  title: String,
  price: Number,
  image: String,
  quantity: { type: Number, default: 1 },
});
const CartItem = mongoose.model("CartItem", cartItemSchema);

// POST /api/cart - Add product to cart
app.post("/api/cart", async (req, res) => {
  const { productId, title, price, image } = req.body;

  if (!productId || !title || !price || !image) {
    return res.status(400).json({ message: "Missing product data." });
  }

  try {
    // Check if item already in cart
    let item = await CartItem.findOne({ productId });

    if (item) {
      // If exists, increment quantity
      item.quantity += 1;
      await item.save();
    } else {
      // Else create new cart item
      item = new CartItem({ productId, title, price, image });
      await item.save();
    }

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/cart - Fetch all cart items
app.get("/api/cart", async (req, res) => {
  try {
    const items = await CartItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart", error: err.message });
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
