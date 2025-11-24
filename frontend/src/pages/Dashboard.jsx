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
  FiHeart,
  FiBook,
} from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../context/authContext";
import { recipeService } from "../services/api";
import ModalRecipe from "../components/dashboard/ModalRecipe";
import ModalConfirmDelete from "../components/dashboard/ModalConfirmDelete";

const Dashboard = () => {
  const { user } = useAuth();

  // États
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Onglet actif : "recipes" ou "favorites"
  const [activeTab, setActiveTab] = useState("recipes");

  // États modales
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // ====================================================
  // CHARGEMENT DES DONNÉES
  // ====================================================

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Charge toutes les recettes
      const recipesResponse = await recipeService.getAll();
      if (recipesResponse.success) {
        setRecipes(recipesResponse.data);
        // Filtre les favoris
        const favs = recipesResponse.data.filter(r => r.isFavorite);
        setFavorites(favs);
      }
    } catch (error) {
      console.error("Erreur chargement:", error);
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
      setFavorites(favorites.filter((r) => r._id !== selectedRecipe._id));
      setShowDeleteModal(false);
      setSelectedRecipe(null);
    } catch (error) {
      console.error("Erreur suppression:", error);
    }
  };

  const handleRecipeSaved = (savedRecipe) => {
    if (isEditing) {
      setRecipes(recipes.map((r) => (r._id === savedRecipe._id ? savedRecipe : r)));
      if (savedRecipe.isFavorite) {
        setFavorites(favorites.map((r) => (r._id === savedRecipe._id ? savedRecipe : r)));
      }
    } else {
      setRecipes([savedRecipe, ...recipes]);
    }
    setShowRecipeModal(false);
  };

  // ====================================================
  // TOGGLE FAVORI
  // ====================================================

  const handleToggleFavorite = async (recipe) => {
    try {
      const response = await recipeService.toggleFavorite(recipe._id);
      
      if (response.success) {
        const updatedRecipe = response.data;
        
        // Met à jour la liste des recettes
        setRecipes(recipes.map((r) => 
          r._id === updatedRecipe._id ? updatedRecipe : r
        ));
        
        // Met à jour la liste des favoris
        if (updatedRecipe.isFavorite) {
          setFavorites([...favorites, updatedRecipe]);
        } else {
          setFavorites(favorites.filter((r) => r._id !== updatedRecipe._id));
        }
      }
    } catch (error) {
      console.error("Erreur toggle favori:", error);
    }
  };

  // ====================================================
  // FILTRAGE
  // ====================================================

  const currentList = activeTab === "recipes" ? recipes : favorites;
  
  const filteredRecipes = currentList.filter((recipe) =>
    recipe.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ====================================================
  // RENDU
  // ====================================================

  return (
    <main
      className="min-h-screen relative text-white overflow-x-hidden"
      style={{
        backgroundImage: `url('/images/assietteBackground.png')`,
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
        style={{ fontFamily: "var(--caveat)", letterSpacing: "3px" }}
      >
        <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-semibold text-xl">Retour</span>
      </Link>

      {/* Contenu */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-24">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wider mb-4"
            style={{ fontFamily: "var(--amatic)" }}
          >
            <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-300 bg-clip-text text-transparent">
              Tableau de bord
            </span>
          </h1>
          <p
            className="text-xl text-gray-300"
            style={{ fontFamily: "var(--caveat)", letterSpacing: "3px" }}
          >
            Bienvenue {user?.username} ! 👨‍🍳
          </p>
        </motion.div>

        {/* Onglets */}
        <motion.div
          className="flex justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <button
            onClick={() => setActiveTab("recipes")}
            className={`flex items-center cursor-pointer gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "recipes"
                ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl shadow-orange-500/30"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
            }`}
            style={{ fontFamily: "var(--caveat)", letterSpacing: "3px" }}
          >
            <FiBook className="w-5 h-5" />
            <span className="text-xl">Mes Recettes</span>
            <span className="ml-1 px-2 py-0.5 rounded-full bg-white/20 text-sm">
              {recipes.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("favorites")}
            className={`flex items-center cursor-pointer gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === "favorites"
                ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-xl shadow-red-500/30"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
            }`}
            style={{ fontFamily: "var(--caveat)", letterSpacing: "3px" }}
          >
            <FiHeart className="w-5 h-5" />
            <span className="text-xl">Mes Favoris</span>
            <span className="ml-1 px-2 py-0.5 rounded-full bg-white/20 text-sm">
              {favorites.length}
            </span>
          </button>
        </motion.div>

        {/* Barre d'actions */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Recherche */}
          <div className="relative w-full sm:w-80">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={`Rechercher dans ${activeTab === "recipes" ? "mes recettes" : "mes favoris"}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-6 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-all backdrop-blur-xl"
              style={{ fontFamily: "var(--caveat)", letterSpacing: "3px" }}
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

          {/* Bouton créer (seulement sur l'onglet Recettes) */}
          {activeTab === "recipes" && (
            <motion.button
              onClick={handleCreateRecipe}
              className="flex items-center cursor-pointer gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all"
              style={{ fontFamily: "var(--caveat)", letterSpacing: "3px" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiPlus className="w-5 h-5" />
              <span className="text-xl">Nouvelle recette</span>
            </motion.button>
          )}
        </motion.div>

        {/* Contenu principal */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
          </div>
        ) : filteredRecipes.length === 0 ? (
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
                : activeTab === "recipes"
                ? "Aucune recette pour le moment"
                : "Aucun favori pour le moment"}
            </h3>
            <p
              className="text-gray-400 mb-8"
              style={{ fontFamily: "var(--caveat)", letterSpacing: "3px" }}
            >
              {searchQuery
                ? "Essayez avec d'autres termes de recherche"
                : activeTab === "recipes"
                ? "Créez votre première recette !"
                : "Ajoutez des recettes à vos favoris en cliquant sur le cœur ❤️"}
            </p>
            {!searchQuery && activeTab === "recipes" && (
              <motion.button
                onClick={handleCreateRecipe}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-xl shadow-orange-500/30"
                style={{ fontFamily: "var(--caveat)", letterSpacing: "3px" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiPlus className="w-5 h-5" />
                <span className="text-xl">Créer ma première recette</span>
              </motion.button>
            )}
          </motion.div>
        ) : (
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
                          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
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

                      {/* Bouton favori */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleToggleFavorite(recipe);
                        }}
                        className="absolute top-3 right-3 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-all"
                      >
                        {recipe.isFavorite ? (
                          <FaHeart className="w-5 h-5 text-red-500" />
                        ) : (
                          <FiHeart className="w-5 h-5 text-white" />
                        )}
                      </button>
                    </div>
                  </Link>

                  {/* Contenu */}
                  <div className="p-5">
                    <Link to={`/recipe/${recipe._id}`}>
                      <h3
                        className="text-2xl font-bold text-white mb-2 line-clamp-1 hover:text-orange-400 transition-colors"
                        style={{ fontFamily: "var(--amatic)" }}
                      >
                        {recipe.title}
                      </h3>
                    </Link>

                    {recipe.description && (
                      <p
                        className="text-gray-400 text-sm mb-3 line-clamp-2"
                        style={{ fontFamily: "var(--caveat)", letterSpacing: "3px" }}
                      >
                        {recipe.description}
                      </p>
                    )}

                    {/* Infos */}
                    <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                      {recipe.prepTime !== undefined && (
                        <div className="flex items-center gap-1">
                          <FiClock className="w-4 h-4" />
                          <span style={{ fontFamily: "var(--caveat)" }}>
                            {recipe.prepTime + (recipe.cookTime || 0)} min
                          </span>
                        </div>
                      )}
                      {recipe.servings && (
                        <div className="flex items-center gap-1">
                          <FiUsers className="w-4 h-4" />
                          <span style={{ fontFamily: "var(--caveat)" }}>
                            {recipe.servings} pers.
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Boutons d'action */}
                    <div className="flex gap-3">
                      <motion.button
                        onClick={() => handleEditRecipe(recipe)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-400 transition-all"
                        style={{ fontFamily: "var(--caveat)", letterSpacing: "3px" }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FiEdit2 className="w-4 h-4" />
                        <span>Modifier</span>
                      </motion.button>

                      <motion.button
                        onClick={() => handleDeleteClick(recipe)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 transition-all"
                        style={{ fontFamily: "var(--caveat)", letterSpacing: "3px" }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FiTrash2 className="w-4 h-4" />
                        <span>Supprimer</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Stats */}
        {!loading && currentList.length > 0 && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p
              className="text-white text-2xl"
              style={{ fontFamily: "var(--caveat)", letterSpacing: "3px" }}
            >
              {filteredRecipes.length} {activeTab === "recipes" ? "recette" : "favori"}
              {filteredRecipes.length > 1 ? "s" : ""} 
              {searchQuery ? " trouvée" + (filteredRecipes.length > 1 ? "s" : "") : ""}
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