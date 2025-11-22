import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import recipeRoute from "./routes/recipeRoute.js";

// Variables d'environnement
dotenv.config();

// Configuration application
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Connexion à MongoDB
connectDB();

// Route de test
app.get("/", (req, res) => {
  res.json({
    message: "Bienvenue sur le backend de Food Chief !",
    version: "1.0.0",
    endpoints: {
      recipes: "/api/recipes",
    },
  });
});

// ✅ Routes API APRÈS les middlewares
app.use("/api/recipes", recipeRoute);

// Gestion des routes non trouvées (404)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route non trouvée",
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
});