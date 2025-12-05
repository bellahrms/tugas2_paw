const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/app-cafe", {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection error:");
    console.error("Message:", error.message);
    console.error("Code:", error.code);

    if (error.message.includes("ECONNREFUSED")) {
      console.error("\n💡 Solusi:");
      console.error("1. Pastikan MongoDB sudah terinstall");
      console.error("2. Jalankan: sudo systemctl start mongod");
      console.error("3. Cek status: sudo systemctl status mongod");
    }

    process.exit(1);
  }
};

// Event listeners untuk monitoring
mongoose.connection.on("connected", () => {
  console.log("📡 Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("📴 Mongoose disconnected");
});

module.exports = connectDB;
