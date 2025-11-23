import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Le nom d'utilisateur est requis"],
      unique: true, // ✅ Index créé automatiquement
      trim: true,
      minlength: [3, "Le nom d'utilisateur doit contenir au moins 3 caractères"],
      maxlength: [50, "Le nom d'utilisateur ne peut pas dépasser 50 caractères"],
    },
    email: {
      type: String,
      required: [true, "L'email est requis"],
      unique: true, // ✅ Index créé automatiquement
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Veuillez fournir un email valide"],
    },
    password: {
      type: String,
      required: [true, "Le mot de passe est requis"],
      minlength: [6, "Le mot de passe doit contenir au moins 6 caractères"],
      select: false, // ✅ N'inclut pas le password par défaut
    },
  },
  {
    timestamps: true, // ✅ Ajoute createdAt et updatedAt
  }
);

const User = mongoose.model('User', userSchema);

export default User;