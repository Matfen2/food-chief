import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";

// Configuration des variables d'environnement
dotenv.config();

// Connexion à la base de données
connectDB();

const app = express();

// Middleware CORS
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));

// Middleware pour parser le JSON et les formulaires
app.use(express.json());
app.use(express.urlencoded());

// Démarrage du serveur
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`\n🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📝 Environnement : ${process.env.NODE_ENV || "development"}`);
  console.log(`🌐 Frontend autorisé : ${process.env.CLIENT_URL || "http://localhost:5173"}\n`);
});