const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Hämtar MONGO_URL från .env-fil
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB är anslutet och redo!");
  } catch (err) {
    console.error("Kunde inte ansluta till MongoDB:", err.message);
    process.exit(1); // Stänger ner servern om kopplingen misslyckas
  }
};

module.exports = connectDB;
