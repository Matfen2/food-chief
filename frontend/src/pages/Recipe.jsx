import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaHeart, FaRegHeart } from "react-icons/fa";
import {
  RecipeHeader,
  RecipeInfoBar,
  IngredientsSection,
  InstructionsSection,
  LoadingState,
  ErrorState,
} from "../components/recipe";
import { recipeService } from "../services/api";

// ========================================
// CUSTOM HOOKS
// ========================================

/**
 * Hook pour charger une recette via le service API
 */
const useRecipe = (id) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        
        // ✅ Utilisation du service API centralisé
        const response = await recipeService.getById(id);
        
        // ✅ Les headers avec token sont gérés automatiquement par le service
        if (response.success) {
          setRecipe(response.data);
        } else {
          throw new Error("Impossible de charger la recette");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRecipe();
  }, [id]);

  return { recipe, loading, error };
};

/**
 * Hook pour gérer les favoris via le service API
 */
const useFavorite = (id, initialFavorite = false) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  useEffect(() => {
    setIsFavorite(initialFavorite);
  }, [initialFavorite]);

  const toggleFavorite = useCallback(async () => {
    try {
      // ✅ Utilisation du service API
      // Note : toggleFavorite n'est pas encore implémenté dans api.js
      // Pour l'instant, on fait un appel direct
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/recipes/${id}/favorite`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        setIsFavorite(prev => !prev);
      }
    } catch (err) {
      console.error("Erreur toggle favori:", err);
    }
  }, [id]);

  return { isFavorite, toggleFavorite };
};

/**
 * Hook pour gérer les checkboxes d'ingrédients (logique locale)
 */
const useIngredientChecks = (ingredientsLength) => {
  const [checkedIngredients, setCheckedIngredients] = useState({});

  useEffect(() => {
    const initialChecks = {};
    for (let i = 0; i < ingredientsLength; i++) {
      initialChecks[i] = false;
    }
    setCheckedIngredients(initialChecks);
  }, [ingredientsLength]);

  const toggleIngredient = useCallback((index) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  }, []);

  return { checkedIngredients, toggleIngredient };
};

// ========================================
// ANIMATION VARIANTS
// ========================================
const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }
};

// ========================================
// MAIN COMPONENT
// ========================================
const Recipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // ✅ Utilisation des custom hooks qui appellent le service API
  const { recipe, loading, error } = useRecipe(id);
  const { isFavorite, toggleFavorite } = useFavorite(id, recipe?.isFavorite);
  const { checkedIngredients, toggleIngredient } = useIngredientChecks(recipe?.ingredients?.length || 0);
  
  const [servings, setServings] = useState(1);

  useEffect(() => {
    if (recipe) {
      setServings(recipe.servings);
    }
  }, [recipe]);

  const incrementServings = useCallback(() => setServings(prev => prev + 1), []);
  const decrementServings = useCallback(() => setServings(prev => Math.max(1, prev - 1)), []);

  if (loading) return <LoadingState />;
  if (error || !recipe) return <ErrorState error={error} onRetry={() => navigate("/")} />;

  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <main 
      className="min-h-screen relative text-white overflow-x-hidden"
      style={{
        backgroundImage: `url('/images/assietteBackground.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay avec effet de bruit */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px] z-0" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30 z-0" />

      {/* Bouton retour avec effet glassmorphism */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-30 gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-2.5 flex items-center justify-center transition-all duration-300 backdrop-blur-xl shadow-2xl hover:scale-105 active:scale-95 group"
        style={{ fontFamily: "var(--spbutch)" }}
      >
        <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span 
          className="font-semibold text-xl"
          style={{ fontFamily: 'var(--caveat)', letterSpacing: '1px' }}   
        >Retour</span>
      </Link>

      {/* Bouton favori avec animation */}
      <button
        onClick={toggleFavorite}
        className="absolute top-6 right-6 z-30 p-3.5 rounded-full cursor-pointer bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 backdrop-blur-xl shadow-2xl hover:scale-110 active:scale-95"
        aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        <AnimatePresence mode="wait">
          {isFavorite ? (
            <motion.div
              key="filled"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <FaHeart className="w-6 h-6 text-red-500 drop-shadow-lg" />
            </motion.div>
          ) : (
            <motion.div
              key="outlined"
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -180 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <FaRegHeart className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Contenu principal */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-24 max-w-8xl">
        <motion.div
          className="flex flex-col items-center"
          variants={ANIMATION_VARIANTS.container}
          initial="hidden"
          animate="visible"
        >
          <RecipeHeader
            image={recipe.image}
            title={recipe.title}
            description={recipe.description}
          />
          
          <RecipeInfoBar
            servings={servings}
            onIncrement={incrementServings}
            onDecrement={decrementServings}
            totalTime={totalTime}
            author={recipe.author}
            createdAt={recipe.createdAt}
            difficulty={recipe.difficulty}
          />
        </motion.div>

        {/* Sections avec meilleur gap */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <IngredientsSection
            ingredients={recipe.ingredients}
            ustensiles={recipe.ustensiles}
            checkedIngredients={checkedIngredients}
            onToggleIngredient={toggleIngredient}
            servings={servings}
            originalServings={recipe.servings}
          />
          
          <InstructionsSection instructions={recipe.instructions} />
        </motion.div>
      </div>
    </main>
  );
};

export default Recipe;