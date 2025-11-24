import express from "express";

import {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  toggleFavorite,
  getFavorites,
} from "../controllers/recipeController.js";

const router = express.Router();

// ====================================================
// ROUTES RECETTES
// ====================================================

// ✅ IMPORTANT : Les routes spécifiques AVANT les routes avec :id

// Récupérer les recettes favorites
router.get("/favorites", getFavorites);

// CRUD de base
router.post("/", createRecipe);
router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

// Toggle favori (supporte PATCH et POST)
router.patch("/:id/favorite", toggleFavorite);
router.post("/:id/favorite", toggleFavorite);

export default router;