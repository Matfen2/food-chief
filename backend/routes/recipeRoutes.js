import express from "express";
import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  toggleFavorite,
  getFavoriteRecipes,
  getMyRecipes,
} from "../controllers/recipeController.js";

const router = express.Router();

// Routes publiques (pas besoin d'authentification)
router.get("/", getAllRecipes);
router.get("/favorites", getFavoriteRecipes);

// Routes privées (nécessitent authentification)
router.get("/myrecipes", getMyRecipes);
router.post("/", createRecipe);

// Routes spécifiques à une recette
router
  .route("/:id")
  .get(getRecipeById) // Public - tout le monde peut voir
  .put(updateRecipe) // Privé - seulement l'auteur
  .delete(deleteRecipe); // Privé - seulement l'auteur

// Route pour basculer le statut favori
router.patch("/:id/favorite", toggleFavorite);

export default router;