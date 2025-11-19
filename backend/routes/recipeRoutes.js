import express from "express";
import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  toggleFavorite,
  getFavoriteRecipes,
} from "../controllers/recipeController.js";

const router = express.Router();

// Routes publiques
router.get("/", getAllRecipes);
router.get("/favorites", getFavoriteRecipes);
router.post("/", createRecipe);

// Routes pour une recette spécifique
router
  .route("/:id")
  .get(getRecipeById)
  .put(updateRecipe)
  .delete(deleteRecipe);

// Routes privées
router.patch("/:id/favorite", toggleFavorite);

export default router;