// db.js
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in the environment variables.");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // Wait 10 seconds before throwing an error
      connectTimeoutMS: 10000, // Time to establish the connection
    });

    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
    
    // Detailed logging for troubleshooting
    if (error.name === "MongooseServerSelectionError") {
      console.error("🚨 Olunga pannu da body soda");
    }

    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
