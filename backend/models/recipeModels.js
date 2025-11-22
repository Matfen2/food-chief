import mongoose from "mongoose";

// ✅ IMPORTANT : Définir les sous-schémas EN PREMIER !
const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Le nom de l'ingrédient est requis"],
    trim: true,
  },
  quantity: {
    type: String, // String pour supporter "500ml", "4", "À volonté", etc.
    required: [true, "La quantité est requise"],
    trim: true,
  },
});

const instructionSchema = new mongoose.Schema({
  step: {
    type: Number,
    required: [true, "Le numéro d'étape est requis"],
  },
  description: {
    type: String,
    required: [true, "La description de l'étape est requise"],
    trim: true,
  },
});

// ✅ ENSUITE : Définir le schéma principal
const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Le titre de la recette est requis"],
      trim: true,
      maxlength: [100, "Le titre ne peut pas dépasser 100 caractères"],
    },
    description: {
      type: String,
      required: [true, "La description est requise"],
      trim: true,
      maxlength: [500, "La description ne peut pas dépasser 500 caractères"],
    },
    image: {
      type: String,
      default: "https://via.placeholder.com/400x300?text=Food+Chief",
    },
    prepTime: {
      type: Number,
      required: [true, "Le temps de préparation est requis"],
      min: [0, "Le temps de préparation doit être positif"],
    },
    cookTime: {
      type: Number,
      required: [true, "Le temps de cuisson est requis"],
      min: [0, "Le temps de cuisson doit être positif"],
    },
    servings: {
      type: Number,
      required: [true, "Le nombre de portions est requis"],
      min: [1, "Il faut au moins 1 portion"],
    },
    difficulty: {
      type: String,
      required: [true, "Le niveau de difficulté est requis"],
      enum: {
        values: ["Facile", "Moyen", "Difficile"],
        message: "La difficulté doit être : Facile, Moyen ou Difficile",
      },
    },
    ingredients: {
      type: [ingredientSchema],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "Au moins un ingrédient est requis",
      },
    },
    instructions: {
      type: [instructionSchema],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "Au moins une instruction est requise",
      },
    },
    ustensiles: {
      type: [String],
      default: [],
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    author: {
      type: String,
      default: "Food Chief",
    },
  },
  {
    timestamps: true,
  }
);

// Index pour améliorer les performances de recherche
recipeSchema.index({ title: "text", description: "text" });
recipeSchema.index({ difficulty: 1 });

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;