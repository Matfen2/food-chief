import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Configuration des variables d'environnement
dotenv.config();

// Connexion à la base de données
connectDB();

const app = express();

// Middleware CORS
app.use(cors({ 
  origin: process.env.CLIENT_URL || "http://localhost:5173", 
  credentials: true 
}));

// Middleware pour parser le JSON et les formulaires
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Route de test
app.get("/", (req, res) => {
  res.json({
    message: "🍽️ Bienvenue sur l'API Food Chief",
    version: "1.0.0",
    endpoints: {
      recipes: "/api/recipes",
      favorites: "/api/recipes/favorites",
    },
  });
});

// Routes de l'API
app.use("/api/recipes", recipeRoutes);

// Middleware de gestion des erreurs
app.use(notFound);
app.use(errorHandler);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`\n🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📝 Environnement : ${process.env.NODE_ENV || "development"}`);
  console.log(`🌐 Frontend autorisé : ${process.env.CLIENT_URL || "http://localhost:5173"}\n`);
});