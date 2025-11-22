import express from "express";
import cors from "cors";

// Configuration application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Bienvenue sur le backend de Food Chief !");
})

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
})