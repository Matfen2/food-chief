import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import recipes from "./recipes.js";

const app = express ();

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Lancement du serveur');
})

// GET /recipes
app.get("/api/recipes", (req, res) => {
    res.status(200).json(recipes);
    console.log("Voici toutes les recettes");
})

// GET /recipes/:id (recette dédiée)
app.get("/api/recipes/:id", (req, res) => {
    const recipe = recipes.find(r => r.id === parseInt(req.params.id));
    if (recipe) {
        res.json(recipe);
    } else {
        res.status(404).send("Recette non trouvée");
    }
})

app.listen(PORT, () => {
    console.log(`Lancement du serveur dans le port ${PORT}`);
})



