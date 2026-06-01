require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
// Koppla till databasen
connectDB();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Gör att vi kan ta emot JSON-data i anropen
//Routes
app.use("/api/menu", require("./routes/menu"));
app.use("/api/auth", require("./routes/auth"));

// Test för att se att servern fungerar
app.get("/", (req, res) => {
  res.json({ message: "Välkommen till bageriets API!" });
});

// Starta servern
app.listen(PORT, () => {
  console.log(`Servern körs på port ${PORT}`);
});
