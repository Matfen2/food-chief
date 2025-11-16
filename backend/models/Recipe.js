import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Le titre est requis"],
      trim: true,
      maxlength: [100, "Le titre ne peut pas dépasser 100 caractères"],
    },
    posted: {
        type: Date || new Date,
    },
    namePosted: {
        type: String,
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
      default: "Moyen",
    },
    category: {
      type: String,
      required: [true, "La catégorie est requise"],
      enum: [
        "Entrée",
        "Plat principal",
        "Dessert",
        "Petit-déjeuner",
        "Goûter",
        "Boisson",
        "Sauce",
        "Autre",
      ],
    },
    image: {
      type: String,
      default: "",
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true, 
  }
);

// Index pour optimiser les recherches
recipeSchema.index({ title: "text", description: "text", tags: "text" });

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;