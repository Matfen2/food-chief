import { useState, useEffect } from "react";
import CardRecipe from "./CardRecipe.jsx";
import FilterBar from "./FilterBar.jsx";

const ListRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ ingredients: [], appareils: [] });

  // Fetch des recettes
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
          setFilteredRecipes(data.data);
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

  // Appliquer les filtres
  useEffect(() => {
    let filtered = [...recipes];

    // Filtrer par ingrédients
    if (filters.ingredients.length > 0) {
      filtered = filtered.filter((recipe) =>
        filters.ingredients.every((filterIng) =>
          recipe.ingredients.some((ing) =>
            ing.name.toLowerCase().includes(filterIng.toLowerCase())
          )
        )
      );
    }

    // Filtrer par appareils
    if (filters.appareils.length > 0) {
      filtered = filtered.filter((recipe) =>
        filters.appareils.every((filterApp) =>
          recipe.ustensiles?.some((ust) =>
            ust.toLowerCase().includes(filterApp.toLowerCase())
          )
        )
      );
    }

    setFilteredRecipes(filtered);
  }, [filters, recipes]);

  // Gérer les changements de filtres
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // États de chargement et d'erreur
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[var(--primary)] border-t-transparent"></div>
        <p className="mt-4 text-gray-500" style={{ fontFamily: "var(--spbutch)" }}>
          Chargement des recettes...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <p className="text-red-500 text-lg font-semibold" style={{ fontFamily: "var(--spbutch)" }}>
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

  return (
    <>
      {/* Barre de filtres */}
      <FilterBar 
        onFilterChange={handleFilterChange} 
        totalRecipes={filteredRecipes.length} 
      />

      {/* Grille de recettes */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredRecipes.map((recipe) => (
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
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <p className="text-gray-500 text-lg" style={{ fontFamily: "var(--spbutch)" }}>
            Aucune recette ne correspond à vos critères de recherche.
          </p>
        </div>
      )}
    </>
  );
};

export default ListRecipes;