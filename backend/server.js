import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Variable d'environnements
dotenv.config();

// Configuration application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Connexion à MongoDB
connectDB();

// Route de test
app.get("/", (req, res) => {
    res.send("Bienvenue sur le backend de Food Chief !");
})

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
})