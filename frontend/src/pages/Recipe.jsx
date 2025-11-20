import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaHeart, FaRegHeart } from "react-icons/fa";
import { FiClock, FiUsers, FiMinus, FiPlus } from "react-icons/fi";

// ========================================
// CONSTANTS
// ========================================
const API_BASE_URL = "http://localhost:3000/api";

const DIFFICULTY_COLORS = {
  Facile: "bg-green-500/80",
  Moyen: "bg-orange-500/80",
  Difficile: "bg-red-500/80",
};

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }
};

// ========================================
// CUSTOM HOOKS
// ========================================
const useRecipe = (id) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/recipes/${id}`);
        
        if (!response.ok) throw new Error("Recette non trouvée");
        
        const data = await response.json();
        
        if (data.success) {
          setRecipe(data.data);
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

const useFavorite = (id, initialFavorite = false) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  useEffect(() => {
    setIsFavorite(initialFavorite);
  }, [initialFavorite]);

  const toggleFavorite = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes/${id}/favorite`, {
        method: "PATCH",
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
// SUB-COMPONENTS
// ========================================
const RecipeImage = ({ image, title }) => (
  <motion.div
    className="mb-8"
    variants={ANIMATION_VARIANTS.item}
  >
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white/20"
        />
      ) : (
        <div className="w-full h-full bg-gray-700/50 backdrop-blur-sm rounded-full shadow-2xl flex items-center justify-center border-4 border-white/20">
          <span className="text-gray-400 text-lg text-center px-4">
            Image de la recette
          </span>
        </div>
      )}
    </div>
  </motion.div>
);

const RecipeTitle = ({ title }) => (
  <motion.h1
    className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider text-center mb-4"
    style={{ fontFamily: "var(--amatic)" }}
    variants={ANIMATION_VARIANTS.item}
  >
    {title}
  </motion.h1>
);

const RecipeDescription = ({ description }) => (
  <motion.p
    className="text-lg text-gray-200 mb-8 leading-relaxed text-center max-w-2xl"
    style={{ fontFamily: "var(--spbutch)" }}
    variants={ANIMATION_VARIANTS.item}
  >
    {description}
  </motion.p>
);

const ServingsCounter = ({ servings, onIncrement, onDecrement }) => (
  <div className="flex items-center gap-4">
    <span className="text-sm font-medium text-gray-300" style={{ fontFamily: "var(--spbutch)" }}>
      Personnes
    </span>
    <div className="flex items-center gap-3">
      <button
        onClick={onDecrement}
        disabled={servings <= 1}
        className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Diminuer le nombre de personnes"
      >
        <FiMinus className="w-4 h-4" />
      </button>
      <span className="text-xl font-bold min-w-[2rem] text-center">{servings}</span>
      <button
        onClick={onIncrement}
        className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
        aria-label="Augmenter le nombre de personnes"
      >
        <FiPlus className="w-4 h-4" />
      </button>
    </div>
  </div>
);

const RecipeInfoBar = ({ servings, onIncrement, onDecrement, totalTime, author, createdAt }) => {
  const formattedDate = useMemo(() => 
    new Date(createdAt).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    [createdAt]
  );

  return (
    <motion.div
      className="w-full max-w-4xl mb-6"
      variants={ANIMATION_VARIANTS.item}
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <ServingsCounter 
            servings={servings}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />

          <div className="flex items-center gap-2">
            <FiClock className="w-5 h-5 text-gray-300" />
            <span className="text-sm font-medium text-gray-300" style={{ fontFamily: "var(--spbutch)" }}>
              Temps de préparation :
            </span>
            <span className="text-xl font-bold">{totalTime} min</span>
          </div>

          <div className="text-sm text-gray-300" style={{ fontFamily: "var(--spbutch)" }}>
            Posté par <span className="text-white font-medium">{author || "Chef anonyme"}</span>
            {" "}le <span className="text-white font-medium">{formattedDate}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DifficultyBadge = ({ difficulty }) => (
  <motion.div className="mb-8" variants={ANIMATION_VARIANTS.item}>
    <span
      className={`inline-block px-6 py-2 rounded-full font-semibold ${DIFFICULTY_COLORS[difficulty]}`}
      style={{ fontFamily: "var(--spbutch)" }}
    >
      {difficulty}
    </span>
  </motion.div>
);

const IngredientCheckbox = ({ ingredient, index, checked, onToggle }) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <input
      type="checkbox"
      checked={checked}
      onChange={() => onToggle(index)}
      className="w-5 h-5 rounded border-2 border-white/30 bg-white/10 checked:bg-[var(--primary)] checked:border-[var(--primary)] cursor-pointer transition-all accent-[var(--primary)]"
    />
    <span
      className={`font-medium transition-all ${
        checked
          ? "line-through text-gray-400"
          : "text-white group-hover:text-gray-200"
      }`}
      style={{ fontFamily: "var(--spbutch)" }}
    >
      {ingredient.quantity} {ingredient.name}
    </span>
  </label>
);

const IngredientsSection = ({ ingredients, ustensiles, checkedIngredients, onToggleIngredient, servings }) => (
  <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col">
    <div className="p-4">
      <h2
        className="text-3xl font-bold uppercase tracking-wider flex items-center gap-2"
        style={{ fontFamily: "var(--amatic)" }}
      >
        Ingrédients
        <span className="text-xl text-gray-400">({servings} pers.)</span>
      </h2>
    </div>
    
    <div className="overflow-auto h-[400px] p-6 space-y-3">
      {ingredients.map((ingredient, index) => (
        <IngredientCheckbox
          key={index}
          ingredient={ingredient}
          index={index}
          checked={checkedIngredients[index] || false}
          onToggle={onToggleIngredient}
        />
      ))}

      {ustensiles?.length > 0 && (
        <div className="mt-6 pt-6 border-t border-white/10">
          <h3
            className="text-2xl font-bold mb-4 uppercase tracking-wider"
            style={{ fontFamily: "var(--amatic)" }}
          >
            Ustensiles
          </h3>
          <div className="flex flex-wrap gap-2">
            {ustensiles.map((ustensile, index) => (
              <span
                key={index}
                className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm border border-white/10"
                style={{ fontFamily: "var(--spbutch)" }}
              >
                {ustensile}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

const InstructionsSection = ({ instructions }) => (
  <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col">
    <div className="p-4">
      <h2
        className="text-3xl font-bold uppercase tracking-wider"
        style={{ fontFamily: "var(--amatic)" }}
      >
        Étapes à suivre
      </h2>
    </div>
    
    <div className="overflow-auto h-[400px] p-6 space-y-4">
      {instructions.map((instruction) => (
        <div key={instruction.step} className="flex gap-4 group">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center font-bold text-white">
            {instruction.step}
          </div>
          <p
            className="text-gray-200 leading-relaxed pt-1 group-hover:text-white transition"
            style={{ fontFamily: "var(--spbutch)" }}
          >
            {instruction.description}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const LoadingState = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mb-4"></div>
      <p className="text-white text-xl" style={{ fontFamily: "var(--spbutch)" }}>
        Chargement...
      </p>
    </div>
  </div>
);

const ErrorState = ({ error, onRetry }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <div className="text-center">
      <div className="text-red-500 text-6xl mb-4">⚠️</div>
      <p className="text-white text-xl mb-4" style={{ fontFamily: "var(--spbutch)" }}>
        {error || "Recette non trouvée"}
      </p>
      <button
        onClick={onRetry}
        className="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition"
        style={{ fontFamily: "var(--spbutch)" }}
      >
        Retour à l'accueil
      </button>
    </div>
  </div>
);

// ========================================
// MAIN COMPONENT
// ========================================
const Recipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
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

  const totalTime = useMemo(
    () => recipe ? recipe.prepTime + recipe.cookTime : 0,
    [recipe]
  );

  if (loading) return <LoadingState />;
  if (error || !recipe) return <ErrorState error={error} onRetry={() => navigate("/")} />;

  return (
    <main 
      className="min-h-screen relative text-white overflow-x-hidden"
      style={{
        backgroundImage: `url('/images/assietteBackground.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-0" />

      {/* Actions buttons */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-30 gap-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
        style={{ fontFamily: "var(--spbutch)" }}
      >
        <FaArrowLeft className="w-4 h-4" />
        <span className="font-medium">Retour</span>
      </Link>

      <button
        onClick={toggleFavorite}
        className="absolute top-6 right-6 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 backdrop-blur-sm"
        aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        <AnimatePresence mode="wait">
          {isFavorite ? (
            <motion.div
              key="filled"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <FaHeart className="w-6 h-6 text-red-500" />
            </motion.div>
          ) : (
            <motion.div
              key="outlined"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <FaRegHeart className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-24 max-w-5xl">
        <motion.div
          className="flex flex-col items-center"
          variants={ANIMATION_VARIANTS.container}
          initial="hidden"
          animate="visible"
        >
          <RecipeImage image={recipe.image} title={recipe.title} />
          <RecipeTitle title={recipe.title} />
          <RecipeDescription description={recipe.description} />
          
          <RecipeInfoBar
            servings={servings}
            onIncrement={incrementServings}
            onDecrement={decrementServings}
            totalTime={totalTime}
            author={recipe.author}
            createdAt={recipe.createdAt}
          />
          
          <DifficultyBadge difficulty={recipe.difficulty} />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
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
          />
          
          <InstructionsSection instructions={recipe.instructions} />
        </motion.div>
      </div>
    </main>
  );
};

export default Recipe;