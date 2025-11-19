import { useState, useEffect } from "react";
import CardRecipe from "./CardRecipe.jsx";

const ListRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch des recettes au montage du composant
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/recipes");
        
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des recettes");
        }
        
        const data = await response.json();
        
        if (data.success) {
          setRecipes(data.data);
        } else {
          setError("Impossible de charger les recettes");
        }
      } catch (err) {
        setError(err.message);
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // État de chargement
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[var(--primary)] border-t-transparent"></div>
        <p 
          className="mt-4 text-gray-500" 
          style={{ fontFamily: "var(--spbutch)" }}
        >
          Chargement des recettes...
        </p>
      </div>
    );
  }

  // État d'erreur
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <p 
          className="text-red-500 text-lg font-semibold" 
          style={{ fontFamily: "var(--spbutch)" }}
        >
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition"
          style={{ fontFamily: "var(--spbutch)" }}
        >
          Réessayer
        </button>
      </div>
    );
  }

  // Aucune recette trouvée
  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🍽️</div>
        <p 
          className="text-gray-500 text-lg" 
          style={{ fontFamily: "var(--spbutch)" }}
        >
          Aucune recette disponible pour le moment.
        </p>
      </div>
    );
  }

  // Affichage de la grille de recettes
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {recipes.map((recipe) => (
        <CardRecipe
          key={recipe._id}
          id={recipe._id}
          title={recipe.title}
          image={recipe.image}
          prepTime={recipe.prepTime}
          cookTime={recipe.cookTime}
          servings={recipe.servings}
          difficulty={recipe.difficulty}
          isFavorite={recipe.isFavorite}
        />
      ))}
    </div>
  );
};

export default ListRecipe;