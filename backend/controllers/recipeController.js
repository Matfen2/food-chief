import Recipe from "../models/Recipe.js";

// @desc    Récupérer toutes les recettes
// @route   GET /api/recipes
// @access  Public
export const getAllRecipes = async (req, res) => {
  try {
    const { search, difficulty, isFavorite } = req.query;

    let filter = {};

    if (search) {
      filter.$text = { $search: search };
    }

    if (difficulty) {
      filter.difficulty = difficulty;
    }

    if (isFavorite !== undefined) {
      filter.isFavorite = isFavorite === "true";
    }

    const recipes = await Recipe.find(filter).sort({ createdAt: -1 });

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

// @desc    Récupérer une recette par ID
// @route   GET /api/recipes/:id
// @access  Public
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

// @desc    Créer une nouvelle recette
// @route   POST /api/recipes
// @access  Public
export const createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);

    res.status(201).json({
      success: true,
      message: "Recette créée avec succès",
      data: recipe,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Erreur de validation",
        errors: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: "Erreur lors de la création de la recette",
      error: error.message,
    });
  }
};

// @desc    Mettre à jour une recette
// @route   PUT /api/recipes/:id
// @access  Public
export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recette non trouvée",
      });
    }

    res.status(200).json({
      success: true,
      message: "Recette mise à jour avec succès",
      data: recipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour de la recette",
      error: error.message,
    });
  }
};

// @desc    Supprimer une recette
// @route   DELETE /api/recipes/:id
// @access  Public
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recette non trouvée",
      });
    }

    res.status(200).json({
      success: true,
      message: "Recette supprimée avec succès",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression de la recette",
      error: error.message,
    });
  }
};

// @desc    Basculer le statut favori
// @route   PATCH /api/recipes/:id/favorite
// @access  Public
export const toggleFavorite = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recette non trouvée",
      });
    }

    recipe.isFavorite = !recipe.isFavorite;
    await recipe.save();

    res.status(200).json({
      success: true,
      message: `Recette ${recipe.isFavorite ? "ajoutée aux" : "retirée des"} favoris`,
      data: recipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la modification du statut favori",
      error: error.message,
    });
  }
};

// @desc    Récupérer toutes les recettes favorites
// @route   GET /api/recipes/favorites
// @access  Public
export const getFavoriteRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ isFavorite: true }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des recettes favorites",
      error: error.message,
    });
  }
};