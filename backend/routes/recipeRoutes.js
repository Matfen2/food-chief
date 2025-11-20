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

// IMPORTANT : Routes spécifiques AVANT les routes avec paramètres dynamiques (:id)

// Routes de collection
router.get("/", getAllRecipes);
router.post("/", createRecipe);

// Routes spécifiques (AVANT /:id)
router.get("/favorites", getFavoriteRecipes);

// Routes avec ID dynamique
router
  .route("/:id")
  .get(getRecipeById)
  .patch(updateRecipe)  
  .delete(deleteRecipe);

// Route spécifique pour toggle favori
router.patch("/:id/favorite", toggleFavorite);

export default router;