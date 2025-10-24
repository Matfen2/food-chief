import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../uielemennts/Header.jsx";
import Collapse from "../uielemennts/Collapse.jsx"


const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Recipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios
      .get(`${API}/api/recipes/${id}`)
      .then((res) => setRecipe(res.data))
      .catch(() => navigate("/404"));
  }, [id, navigate]);

  if (!recipe)
    return (
      <div className="flex items-center justify-center min-h-screen text-white/80">
        Chargement...
      </div>
    );

  return (
    <main
      className="relative min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/images/assietteBackground.png')",
        backgroundAttachment: "fixed",
      }}
    >
      {/* filtre sombre */}
      <div className="absolute inset-0 bg-black/60" />

      {/* contenu */}
      <div className="relative z-10">
        <Header />

        {/* section principale */}
        <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-10 items-center">
          {/* Image de la recette */}
          <div className="flex justify-center">
            <img
              src={`/images/recipes/${recipe.image}`}
              alt={recipe.name}
              className="rounded-lg shadow-2xl object-cover w-[90%] max-h-[400px]"
              loading="lazy"
            />
          </div>

          {/* Contenu principal */}
          <div>
            <h1
              className="text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--bebas)" }}
            >
              {recipe.name}
            </h1>

            {/* Tags (moment, durée) */}
            <div className="flex gap-4 mb-4">
              <span className="bg-green-700 px-4 py-1 rounded-md">
                {recipe.moment || "Petit déjeuner"}
              </span>
              <span className="bg-green-700 px-4 py-1 rounded-md">
                {recipe.time || "30 min"}
              </span>
            </div>

            {/* Description */}
            <p className="text-white/90 leading-relaxed mb-4 max-w-xl">
              {recipe.description ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
            </p>

            {/* Auteur */}
            <p className="text-sm text-white/70 italic">
              Posté par <span className="text-white">{recipe.pseudo}</span> le{" "}
              {recipe.date || "DD/MM/YYYY"}
            </p>
          </div>
        </section>

        {/* blocs ingrédients et étapes */}
        <section className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto px-6 pb-20">
            <Collapse title="Ingrédients" defaultOpen>
                <ul className="space-y-1">
                {recipe.ingredients?.map((i, idx) => (
                    <li key={idx}>
                    {i.quantity ? `${i.quantity} ` : ""}
                    {i.unit ? `${i.unit} ` : ""}
                    {i.ingredient}
                    </li>
                ))}
                </ul>
            </Collapse>

            <Collapse title="Étapes à suivre">
                <p className="whitespace-pre-line">{recipe.description}</p>
            </Collapse>
        </section>
      </div>
    </main>
  );
}
