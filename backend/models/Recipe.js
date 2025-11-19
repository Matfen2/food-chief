import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Le titre est requis"],
      trim: true,
      maxlength: [100, "Le titre ne peut pas dépasser 100 caractères"],
    },
    description: {
      type: String,
      required: [true, "La description est requise"],
      maxlength: [500, "La description ne peut pas dépasser 500 caractères"],
    },
    ingredients: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: String,
          required: true,
        },
      },
    ],
    instructions: [
      {
        step: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    prepTime: {
      type: Number, // en minutes
      required: [true, "Le temps de préparation est requis"],
    },
    cookTime: {
      type: Number, // en minutes
      required: [true, "Le temps de cuisson est requis"],
    },
    servings: {
      type: Number,
      required: [true, "Le nombre de portions est requis"],
      min: [1, "Le nombre de portions doit être au moins 1"],
    },
    difficulty: {
      type: String,
      enum: ["Facile", "Moyen", "Difficile"],
      required: [true, "La difficulté est requise"],
    },
    image: {
      type: String,
      default: "",
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // createdAt et updatedAt automatiques
  }
);

// Index pour la recherche (seulement titre et description maintenant)
recipeSchema.index({ title: "text", description: "text" });

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;