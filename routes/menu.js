const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// HÄMTA ALLA PRODUKTER
// READ/GET /api/menu
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Kunde inte hämta menyn", error: err.message });
  }
});

// Hämta en specifik menyprodukt med ID
router.get("/:id", async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res
        .status(404)
        .json({ message: "Hittade ingen produkt med det ID:t" });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Serverfel", error: err.message });
  }
});

//LÄGG TILL EN PRODUKT (Admin)
// CREATE/POST /api/menu
router.post("/", async (req, res) => {
  const { title, description, price, category } = req.body;

  try {
    const newItem = new MenuItem({
      title,
      description,
      price,
      category,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Kunde inte lägga till produkten", error: err.message });
  }
});

// UPPDATERA EN PRODUKT (Update)
// PUT /api/menu/:id
router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Gör att vi får tillbaka den uppdaterade produkten i svaret
    );
    res.json(updatedItem);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Kunde inte uppdatera", error: err.message });
  }
});

// RADERA EN PRODUKT (Delete)
// DELETE /api/menu/:id
router.delete("/:id", async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Produkten har raderats från menyn" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Kunde inte radera produkten", error: err.message });
  }
});

// Uppdatera en menyprodukt med ID
// PUT /api/menu/:id
router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Får tillbaka det uppdaterade objektet i svaret
    );

    if (!updatedItem) {
      return res
        .status(404)
        .json({ message: "Hittade ingen produkt med det ID:t" });
    }

    res.json(updatedItem);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Kunde inte uppdatera produkten", error: err.message });
  }
});

module.exports = router;
