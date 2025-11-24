import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiClock,
  FiUsers,
  FiArrowLeft,
  FiSearch,
  FiX,
} from "react-icons/fi";
import { useAuth } from "../context/authContext";
import { recipeService } from "../services/api";
import ModalRecipe from "../components/dashboard/ModalRecipe";
import ModalConfirmDelete from "../components/dashboard/ModalConfirmDelete";

const Dashboard = () => {
  const { user } = useAuth();

  // États
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // États modales
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // ====================================================
  // CHARGEMENT DES RECETTES
  // ====================================================

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      setLoading(true);
      const response = await recipeService.getAll();
      
      if (response.success) {
        setRecipes(response.data);
      }
    } catch (error) {
      console.error("Erreur chargement recettes:", error);
    } finally {
      setLoading(false);
    }
  };

  // ====================================================
  // GESTION DES RECETTES
  // ====================================================

  const handleCreateRecipe = () => {
    setSelectedRecipe(null);
    setIsEditing(false);
    setShowRecipeModal(true);
  };

  const handleEditRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setIsEditing(true);
    setShowRecipeModal(true);
  };

  const handleDeleteClick = (recipe) => {
    setSelectedRecipe(recipe);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await recipeService.delete(selectedRecipe._id);
      setRecipes(recipes.filter((r) => r._id !== selectedRecipe._id));
      setShowDeleteModal(false);
      setSelectedRecipe(null);
    } catch (error) {
      console.error("Erreur suppression:", error);
    }
  };

  const handleRecipeSaved = (savedRecipe) => {
    if (isEditing) {
      // Mise à jour
      setRecipes(
        recipes.map((r) => (r._id === savedRecipe._id ? savedRecipe : r))
      );
    } else {
      // Création
      setRecipes([savedRecipe, ...recipes]);
    }
    setShowRecipeModal(false);
  };

  // ====================================================
  // FILTRAGE DES RECETTES
  // ====================================================

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ====================================================
  // RENDU
  // ====================================================

  return (
    <main
      className="min-h-screen relative text-white overflow-x-hidden"
      style={{
        backgroundImage: `url('/images/boisWallpaper.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px] z-0" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30 z-0" />

      {/* Bouton retour */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-30 gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-2.5 flex items-center justify-center transition-all duration-300 backdrop-blur-xl shadow-2xl hover:scale-105 active:scale-95 group"
        style={{ fontFamily: "var(--caveat)", letterSpacing: "1px" }}
      >
        <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-semibold text-xl">Retour</span>
      </Link>

      {/* Contenu */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-24">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1
            className="text-5xl md:text-6xl lg:text-8xl font-bold uppercase tracking-wider mb-4"
            style={{ fontFamily: "var(--amatic)" }}
          >
            <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-300 bg-clip-text text-transparent">
              Mes Recettes
            </span>
          </h1>
          <p
            className="text-3xl font-bold mt-8   to-blue-100"
            style={{ fontFamily: "var(--caveat)", letterSpacing: "3px" }}
          >
            Bienvenue {user?.username} ! Gérez vos créations culinaires 👨‍🍳
          </p>
        </motion.div>

        {/* Barre d'actions */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-between items-center -mt-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Recherche */}
          <div className="relative w-full sm:w-80">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une recette..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-6 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-all backdrop-blur-xl"
              style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <FiX className="w-5 h-5 cursor-pointer" />
              </button>
            )}
          </div>

          {/* Bouton créer */}
          <motion.button
            onClick={handleCreateRecipe}
            className="flex items-center gap-2 px-6 py-3 cursor-pointer rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all"
            style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPlus className="w-5 h-5" />
            <span className="text-xl">Nouvelle recette</span>
          </motion.button>
        </motion.div>

        {/* Contenu principal */}
        {loading ? (
          // Loader
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
          </div>
        ) : filteredRecipes.length === 0 ? (
          // État vide
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3
              className="text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--amatic)" }}
            >
              {searchQuery
                ? "Aucune recette trouvée"
                : "Aucune recette pour le moment"}
            </h3>
            <p
              className="text-gray-400 mb-8"
              style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
            >
              {searchQuery
                ? "Essayez avec d'autres termes de recherche"
                : "Créez votre première recette et partagez vos talents culinaires !"}
            </p>
            {!searchQuery && (
              <motion.button
                onClick={handleCreateRecipe}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-xl shadow-orange-500/30"
                style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiPlus className="w-5 h-5" />
                <span className="text-xl">Créer ma première recette</span>
              </motion.button>
            )}
          </motion.div>
        ) : (
          // Grille de recettes
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <AnimatePresence>
              {filteredRecipes.map((recipe, index) => (
                <motion.div
                  key={recipe._id}
                  className="group relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Image */}
                  <Link to={`/recipe/${recipe._id}`} className="block">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={recipe.image || "/images/default-recipe.jpg"}
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      {/* Badge difficulté */}
                      {recipe.difficulty && (
                        <span
                          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-lg font-semibold ${
                            recipe.difficulty === "Facile"
                              ? "bg-green-500/80"
                              : recipe.difficulty === "Moyen"
                              ? "bg-yellow-500/80"
                              : "bg-red-500/80"
                          }`}
                          style={{ fontFamily: "var(--caveat)", letterSpacing: "3px" }}
                        >
                          {recipe.difficulty}
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Contenu */}
                  <div className="p-5">
                    <Link to={`/recipe/${recipe._id}`}>
                      <h3
                        className="text-3xl font-bold text-white mb-3 line-clamp-1 hover:text-orange-400 transition-colors"
                        style={{ fontFamily: "var(--amatic)" }}
                      >
                        {recipe.title}
                      </h3>
                    </Link>

                    {/* Description courte */}
                    {recipe.description && (
                      <p
                        className="text-gray-400 text-lg mb-3 line-clamp-2"
                        style={{ fontFamily: "var(--caveat)", letterSpacing: "3px" }}
                      >
                        {recipe.description}
                      </p>
                    )}

                    {/* Infos */}
                    <div className="flex items-center gap-8 text-gray-400 mb-4">
                      {recipe.prepTime !== undefined && (
                        <div className="flex items-center gap-1">
                          <FiClock className="w-4 h-4" />
                          <span className="text-xl ml-1" style={{ fontFamily: "var(--caveat)", letterSpacing: "3px" }}>
                            {recipe.prepTime + (recipe.cookTime || 0)} min
                          </span>
                        </div>
                      )}
                      {recipe.servings && (
                        <div className="flex items-center gap-1">
                          <FiUsers className="w-4 h-4" />
                          <span className="text-xl ml-1" style={{ fontFamily: "var(--caveat)", letterSpacing: "3px" }}>
                            {recipe.servings} pers.
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Boutons d'action */}
                    <div className="flex gap-3">
                      <motion.button
                        onClick={() => handleEditRecipe(recipe)}
                        className="flex-1 flex items-center justify-center cursor-pointer gap-2 px-4 py-2.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 transition-all"
                        style={{ fontFamily: "var(--caveat)", letterSpacing: "1px" }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FiEdit2 className="w-4 h-4" />
                        <span className="text-xl">Modifier</span>
                      </motion.button>

                      <motion.button
                        onClick={() => handleDeleteClick(recipe)}
                        className="flex-1 flex items-center justify-center cursor-pointer gap-2 px-4 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 transition-all"
                        style={{ fontFamily: "var(--caveat)", letterSpacing: "1px" }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FiTrash2 className="w-4 h-4" />
                        <span className="text-xl">Supprimer</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Stats */}
        {!loading && recipes.length > 0 && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p
              className="text-white text-2xl"
              style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
            >
              {recipes.length} recette{recipes.length > 1 ? "s" : ""} au total
            </p>
          </motion.div>
        )}
      </div>

      {/* Modales */}
      <ModalRecipe
        isOpen={showRecipeModal}
        onClose={() => setShowRecipeModal(false)}
        recipe={selectedRecipe}
        isEditing={isEditing}
        onSave={handleRecipeSaved}
      />

      <ModalConfirmDelete
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        recipeName={selectedRecipe?.title}
      />
    </main>
  );
};

export default Dashboard;