import Recipe from "../models/recipeModels.js";

// Créer une recette
export const createRecipe = async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    const savedRecipe = await newRecipe.save();
    
    res.status(201).json({
      success: true,
      message: "Recette créée avec succès",
      data: savedRecipe,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Erreur lors de la création de la recette",
      error: error.message,
    });
  }
};

// Obtenir toutes les recettes (avec recherche optionnelle par titre)
export const getAllRecipes = async (req, res) => {
  try {
    const { title } = req.query;
    
    let query = {};
    
    if (title && title.trim() !== '') {
      query.title = { $regex: title.trim(), $options: 'i' };
      console.log(`🔍 Recherche avec titre: "${title}"`);
    } else {
      console.log('📋 Récupération de toutes les recettes');
    }
    
    const recipes = await Recipe.find(query).sort({ createdAt: -1 });
    
    console.log(`✅ ${recipes.length} recette(s) trouvée(s)`);
    
    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des recettes",
      error: error.message,
    });
  }
};

// Obtenir une recette par ID
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recette non trouvée",
      });
    }
    
    res.status(200).json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération de la recette",
      error: error.message,
    });
  }
};

// Mettre à jour une recette
export const updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedRecipe) {
      return res.status(404).json({
        success: false,
        message: "Recette non trouvée",
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Recette mise à jour avec succès",
      data: updatedRecipe,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Erreur lors de la mise à jour de la recette",
      error: error.message,
    });
  }
};

// Supprimer une recette
export const deleteRecipe = async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    
    if (!deletedRecipe) {
      return res.status(404).json({
        success: false,
        message: "Recette non trouvée",
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Recette supprimée avec succès",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression de la recette",
      error: error.message,
    });
  }
};

// ====================================================
// ✅ NOUVEAU : Toggle le statut favori d'une recette
// ====================================================
export const toggleFavorite = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recette non trouvée",
      });
    }
    
    // Toggle le statut isFavorite
    recipe.isFavorite = !recipe.isFavorite;
    await recipe.save();
    
    console.log(`⭐ Recette "${recipe.title}" - Favori: ${recipe.isFavorite}`);
    
    res.status(200).json({
      success: true,
      message: recipe.isFavorite ? "Ajouté aux favoris" : "Retiré des favoris",
      data: recipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la modification du favori",
      error: error.message,
    });
  }
};

// ====================================================
// ✅ NOUVEAU : Récupérer toutes les recettes favorites
// ====================================================
export const getFavorites = async (req, res) => {
  try {
    const favorites = await Recipe.find({ isFavorite: true }).sort({ updatedAt: -1 });
    
    console.log(`⭐ ${favorites.length} recette(s) favorite(s) trouvée(s)`);
    
    res.status(200).json({
      success: true,
      count: favorites.length,
      data: favorites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des favoris",
      error: error.message,
    });
  }
};