import Recipe from "../models/Recipe.js";

// @desc    Récupérer toutes les recettes
// @route   GET /api/recipes
// @access  Public
export const getAllRecipes = async (req, res) => {
  try {
    const { search, category, difficulty, isFavorite } = req.query;

    // Construire le filtre dynamiquement
    let filter = {};

    if (search) {
      filter.$text = { $search: search };
    }

    if (category) {
      filter.category = category;
    }

    if (difficulty) {
      filter.difficulty = difficulty;
    }

    if (isFavorite !== undefined) {
      filter.isFavorite = isFavorite === "true";
    }

    // Récupérer les recettes avec les infos de l'auteur
    const recipes = await Recipe.find(filter)
      .populate("createdBy", "name email avatar") // Récupère les infos du créateur
      .sort({ createdAt: -1 });

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
    const recipe = await Recipe.findById(req.params.id)
      .populate("createdBy", "name email avatar"); // Infos de l'auteur

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
// @access  Private (nécessite authentification)
export const createRecipe = async (req, res) => {
  try {
    // Créer la recette avec l'ID de l'utilisateur connecté
    const recipe = await Recipe.create({
      ...req.body,
      createdBy: req.user._id, // Ajout automatique de l'auteur
    });

    // Récupérer la recette avec les infos du créateur
    const populatedRecipe = await Recipe.findById(recipe._id)
      .populate("createdBy", "name email avatar");

    res.status(201).json({
      success: true,
      message: "Recette créée avec succès",
      data: populatedRecipe,
    });
  } catch (error) {
    // Gestion des erreurs de validation Mongoose
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
// @access  Private (seulement le créateur)
export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recette non trouvée",
      });
    }

    // Vérifier que c'est bien l'auteur qui modifie
    if (recipe.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Vous n'êtes pas autorisé à modifier cette recette",
      });
    }

    // Mettre à jour la recette
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Retourne le document modifié
        runValidators: true, // Execute les validateurs du schéma
      }
    ).populate("createdBy", "name email avatar");

    res.status(200).json({
      success: true,
      message: "Recette mise à jour avec succès",
      data: updatedRecipe,
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
      message: "Erreur lors de la mise à jour de la recette",
      error: error.message,
    });
  }
};

// @desc    Supprimer une recette
// @route   DELETE /api/recipes/:id
// @access  Private (seulement le créateur)
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recette non trouvée",
      });
    }

    // Pour vérifier que c'est bien l'auteur qui supprime
    if (recipe.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Vous n'êtes pas autorisé à supprimer cette recette",
      });
    }

    await Recipe.findByIdAndDelete(req.params.id);

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

// @desc    Basculer le statut favori d'une recette
// @route   POST /api/recipes/:id/favorite
// @access  Private
export const toggleFavorite = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recette non trouvée",
      });
    }

    // Basculer le statut favori
    recipe.isFavorite = !recipe.isFavorite;
    await recipe.save();

    // Récupérer la recette mise à jour avec les infos du créateur
    const updatedRecipe = await Recipe.findById(recipe._id)
      .populate("createdBy", "name email avatar");

    res.status(200).json({
      success: true,
      message: `Recette ${
        recipe.isFavorite ? "ajoutée aux" : "retirée des"
      } favoris`,
      data: updatedRecipe,
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
    const recipes = await Recipe.find({ isFavorite: true })
      .populate("createdBy", "name email avatar")
      .sort({ createdAt: -1 });

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

// @desc    Récupérer toutes les recettes de l'utilisateur connecté
// @route   GET /api/recipes/myrecipes
// @access  Private
export const getMyRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ createdBy: req.user._id })
      .populate("createdBy", "name email avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération de vos recettes",
      error: error.message,
    });
  }
};