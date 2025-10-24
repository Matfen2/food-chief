import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import recipes from "./recipes.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Server is running");
})

// GET /recipes
app.get("/api/recipes", (req, res) => {
    res.json(recipes);
    res.status(200);
    res.send(console.log("Voici toutes les recettes"));
})

// GET /recipes/:id (recette dédiée)
app.get("/api/recipes/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = recipes.find((r) => r.id === id);
  if (!item) return res.status(404).json({ error: "Recette introuvable" });
  res.status(200).json(item);
});

// GET /connect (se connecter à son compte)

// POST / register (créer un compte)

// POST /newRecipe (ajouter une nouvelle recette)

// PUT /recipes/:id (modifier une recette)

// POST /addFavorite/:id (ajouter une recette aux favoris)

// DELETE /removeFavorite/:id (supprimer une recette des favoris)

// Error 404
app.use((_req, res) => {
  res.status(404).json({ error: "Aucune recette trouvée" });
});

// Server listening
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

