require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();
app.use(express.json({ limit: "5mb" })); // Support for profile picture uploads
app.use(cors({
  origin: ["http://localhost:3000", "https://blossomsbotique.com"],
  credentials: true,
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("connected", () => console.log("✅ MongoDB Connected Successfully"));
db.on("error", (err) => console.error("❌ MongoDB Connection Error:", err));
db.on("disconnected", () => console.log("⚠️ MongoDB Disconnected"));

// User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, default: "User" },
  email: String,
  phone: String,
  password: String,
  profilePic: { type: String, default: "/assets/profile-icon.png" },
  cart: [{ productId: String, quantity: Number }],
});
const User = mongoose.model("User", UserSchema);

// Auth Controller
app.post("/api/auth/register", async (req, res) => {
  const { name, email, phone, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, phone, password: hashedPassword });
  await user.save();
  res.json({ message: "User registered successfully" });
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email, phone: user.phone, profilePic: user.profilePic }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Middleware to Authenticate User
const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Get User Profile (This is the route you're missing)
app.get("/api/user/profile", authMiddleware, async (req, res) => {
  try {
    const user = req.user; // This comes from the middleware (authenticated user)
    res.json(user);  // Send the user data as a response
  } catch (err) {
    res.status(500).json({ error: "Error fetching user data" });
  }
});

// Update User Profile
app.put("/api/user/profile", authMiddleware, async (req, res) => {
  const { name, email, phone, profilePic } = req.body;
  try {
    req.user.name = name || req.user.name;
    req.user.email = email || req.user.email;
    req.user.phone = phone || req.user.phone;
    req.user.profilePic = profilePic || req.user.profilePic;
    await req.user.save();
    res.json({ message: "Profile updated successfully", user: req.user });
  } catch (err) {
    res.status(500).json({ error: "Error updating profile" });
  }
});

// Cart Controller

// Add or update item in cart
app.post("/api/cart/add", authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;
  const user = req.user; // User will be added to the request by the authMiddleware

  // Check if the item already exists in the cart
  const existingItemIndex = user.cart.findIndex(item => item.productId.toString() === productId);

  if (existingItemIndex > -1) {
    // If item exists, update the quantity
    user.cart[existingItemIndex].quantity = quantity;
  } else {
    // Otherwise, add a new item to the cart
    user.cart.push({ productId, quantity });
  }

  await user.save(); // Save updated user data
  res.json({ message: "Item added/updated in cart", cart: user.cart });
});

// Fetch cart items
app.get("/api/cart", authMiddleware, (req, res) => {
  res.json(req.user.cart); // Send user's cart data
});

// Remove item from cart
app.put("/api/cart/remove", authMiddleware, async (req, res) => {
  const { productId } = req.body;
  const user = req.user;

  // Remove the item with the given productId
  user.cart = user.cart.filter(item => item.productId.toString() !== productId);

  await user.save(); // Save the updated user data
  res.json({ message: "Item removed from cart", cart: user.cart });
});


// Order Controller with Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post("/api/order/create", authMiddleware, async (req, res) => {
  const { amount, currency } = req.body;
  const options = { amount: amount * 100, currency, receipt: `order_${Date.now()}` };
  const order = await razorpay.orders.create(options);
  res.json(order);
});

// Health Check Route
app.get("/api/health", (req, res) => {
  res.json({ message: "API is running", dbStatus: mongoose.connection.readyState === 1 ? "Connected" : "Not Connected" });
});

// Address Schema
const AddressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  street: String,
  city: String,
  state: String,
  pincode: String,
  phoneNumber: String,
});

const Address = mongoose.model("Address", AddressSchema);

// Save Address API
app.post("/api/address/save", authMiddleware, async (req, res) => {
  try {
    const { name, street, city, state, pincode, phoneNumber } = req.body;
    
    // Check if address already exists for the user
    let address = await Address.findOne({ userId: req.user._id });

    if (address) {
      // Update the existing address
      address.name = name;
      address.street = street;
      address.city = city;
      address.state = state;
      address.pincode = pincode;
      address.phoneNumber = phoneNumber;
    } else {
      // Create a new address
      address = new Address({
        userId: req.user._id,
        name,
        street,
        city,
        state,
        pincode,
        phoneNumber,
      });
    }

    await address.save();
    res.json({ message: "Address saved successfully!", address });
  } catch (error) {
    console.error("Error saving address:", error);
    res.status(500).json({ error: "Failed to save address" });
  }
});

// Fetch Address API
app.get("/api/address", authMiddleware, async (req, res) => {
  try {
    const address = await Address.findOne({ userId: req.user._id });
    res.json(address || {});
  } catch (error) {
    console.error("Error fetching address:", error);
    res.status(500).json({ error: "Failed to fetch address" });
  }
});


// Start Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
