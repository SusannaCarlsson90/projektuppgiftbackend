/**
 * Routes for auth
 */
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Lägg till ny användare
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kontrollera att båda fälten finns
    if (!username || !password) {
      return res.status(400).json({ error: "Användarnamn och lösenord krävs" });
    }

    // Här anropas userSchema.statics.register från User.js
    const user = await User.register(username, password);

    res.status(201).json({
      message: "Användare skapad!",
      user: { username: user.username },
    });
  } catch (error) {
    console.error("Fel vid registrering:", error);
    res.status(400).json({
      error: "Kunde inte registrera användaren. Namnet kan vara upptaget.",
    });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    //Validera input
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Invalid input, send username and password" });
    }

    // Kolla om användaren finns i databasen
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Incorrect username/password!" });
    }

    //Kontrollera lösenord använder metoden i User.js
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Incorrect username/password!" });
    } else {
      //Create JWT
      const payload = { username: username };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      const response = {
        message: "User logged in",
        token: token,
      };
      //Om allt stämmer
      res.status(200).json({ response });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
