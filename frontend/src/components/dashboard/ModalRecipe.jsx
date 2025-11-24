import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiImage,
  FiClock,
  FiUsers,
  FiPlus,
  FiTrash2,
  FiAlertCircle,
} from "react-icons/fi";
import { recipeService } from "../../services/api";

const ModalRecipe = ({ isOpen, onClose, recipe, isEditing, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    prepTime: "",
    cookTime: "",
    servings: "",
    difficulty: "Facile",
    ingredients: [{ name: "", quantity: "" }],
    instructions: [{ step: 1, description: "" }],
    ustensiles: [""],
    author: "Food Chief",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ====================================================
  // INITIALISATION DU FORMULAIRE
  // ====================================================

  useEffect(() => {
    if (isEditing && recipe) {
      console.log("📝 Mode édition - Recette chargée:", recipe);
      
      const newFormData = {
        title: recipe.title || "",
        description: recipe.description || "",
        image: recipe.image || "",
        prepTime: recipe.prepTime !== undefined ? String(recipe.prepTime) : "",
        cookTime: recipe.cookTime !== undefined ? String(recipe.cookTime) : "",
        servings: recipe.servings !== undefined ? String(recipe.servings) : "",
        difficulty: recipe.difficulty || "Facile",
        ingredients: recipe.ingredients?.length > 0 
          ? recipe.ingredients.map(i => ({ 
              name: i.name || "", 
              quantity: i.quantity || "" 
            }))
          : [{ name: "", quantity: "" }],
        instructions: recipe.instructions?.length > 0 
          ? recipe.instructions.map((i, idx) => ({ 
              step: i.step || idx + 1, 
              description: i.description || "" 
            }))
          : [{ step: 1, description: "" }],
        ustensiles: recipe.ustensiles?.length > 0 
          ? [...recipe.ustensiles]
          : [""],
        author: recipe.author || "Food Chief",
      };
      
      console.log("📋 FormData initialisé:", newFormData);
      setFormData(newFormData);
    } else {
      console.log("➕ Mode création - Reset du formulaire");
      setFormData({
        title: "",
        description: "",
        image: "",
        prepTime: "",
        cookTime: "",
        servings: "",
        difficulty: "Facile",
        ingredients: [{ name: "", quantity: "" }],
        instructions: [{ step: 1, description: "" }],
        ustensiles: [""],
        author: "Food Chief",
      });
    }
    setError("");
  }, [isEditing, recipe, isOpen]);

  // ====================================================
  // GESTION DES CHAMPS SIMPLES
  // ====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) setError("");
  };

  // ====================================================
  // GESTION DES INGRÉDIENTS
  // ====================================================

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: "", quantity: "" }],
    });
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData({ ...formData, ingredients: newIngredients });
    }
  };

  // ====================================================
  // GESTION DES INSTRUCTIONS
  // ====================================================

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = { step: index + 1, description: value };
    setFormData({ ...formData, instructions: newInstructions });
  };

  const addInstruction = () => {
    const nextStep = formData.instructions.length + 1;
    setFormData({
      ...formData,
      instructions: [...formData.instructions, { step: nextStep, description: "" }],
    });
  };

  const removeInstruction = (index) => {
    if (formData.instructions.length > 1) {
      const newInstructions = formData.instructions
        .filter((_, i) => i !== index)
        .map((instruction, i) => ({ ...instruction, step: i + 1 }));
      setFormData({ ...formData, instructions: newInstructions });
    }
  };

  // ====================================================
  // GESTION DES USTENSILES
  // ====================================================

  const handleUstensileChange = (index, value) => {
    const newUstensiles = [...formData.ustensiles];
    newUstensiles[index] = value;
    setFormData({ ...formData, ustensiles: newUstensiles });
  };

  const addUstensile = () => {
    setFormData({ ...formData, ustensiles: [...formData.ustensiles, ""] });
  };

  const removeUstensile = (index) => {
    if (formData.ustensiles.length > 1) {
      const newUstensiles = formData.ustensiles.filter((_, i) => i !== index);
      setFormData({ ...formData, ustensiles: newUstensiles });
    }
  };

  // ====================================================
  // VALIDATION
  // ====================================================

  const validateForm = () => {
    console.log("🔍 === VALIDATION DÉMARRÉE ===");
    console.log("📋 Données actuelles:", formData);

    if (!formData.title || !formData.title.trim()) {
      console.log("❌ Échec: Titre manquant");
      setError("Le titre est requis");
      return false;
    }
    console.log("✓ Titre OK:", formData.title);

    if (!formData.description || !formData.description.trim()) {
      console.log("❌ Échec: Description manquante");
      setError("La description est requise");
      return false;
    }
    console.log("✓ Description OK");

    const prepTimeNum = parseInt(formData.prepTime);
    if (isNaN(prepTimeNum) || prepTimeNum < 0) {
      console.log("❌ Échec: Temps de préparation invalide:", formData.prepTime);
      setError("Le temps de préparation est requis (nombre >= 0)");
      return false;
    }
    console.log("✓ PrepTime OK:", prepTimeNum);

    const cookTimeNum = parseInt(formData.cookTime);
    if (isNaN(cookTimeNum) || cookTimeNum < 0) {
      console.log("❌ Échec: Temps de cuisson invalide:", formData.cookTime);
      setError("Le temps de cuisson est requis (nombre >= 0)");
      return false;
    }
    console.log("✓ CookTime OK:", cookTimeNum);

    const servingsNum = parseInt(formData.servings);
    if (isNaN(servingsNum) || servingsNum < 1) {
      console.log("❌ Échec: Portions invalides:", formData.servings);
      setError("Le nombre de portions est requis (minimum 1)");
      return false;
    }
    console.log("✓ Servings OK:", servingsNum);

    // Vérification des ingrédients
    const validIngredients = formData.ingredients.filter(
      (i) => i.name && i.name.trim() && i.quantity && i.quantity.trim()
    );
    console.log("📦 Ingrédients valides:", validIngredients);
    
    if (validIngredients.length === 0) {
      console.log("❌ Échec: Aucun ingrédient valide");
      setError("Ajoutez au moins un ingrédient complet (nom et quantité)");
      return false;
    }
    console.log("✓ Ingrédients OK:", validIngredients.length);

    // Vérification des instructions
    const validInstructions = formData.instructions.filter(
      (i) => i.description && i.description.trim()
    );
    console.log("📝 Instructions valides:", validInstructions);
    
    if (validInstructions.length === 0) {
      console.log("❌ Échec: Aucune instruction valide");
      setError("Ajoutez au moins une instruction");
      return false;
    }
    console.log("✓ Instructions OK:", validInstructions.length);

    console.log("✅ === VALIDATION RÉUSSIE ===");
    return true;
  };

  // ====================================================
  // SOUMISSION
  // ====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("\n🚀 ========== SOUMISSION DÉMARRÉE ==========");
    console.log("📋 FormData actuel:", formData);
    console.log("📝 Mode édition:", isEditing);
    console.log("🆔 Recipe ID:", recipe?._id);

    if (!validateForm()) {
      console.log("⚠️ Validation échouée - Arrêt");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Nettoie les données
      const cleanedData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        image: formData.image.trim() || "https://via.placeholder.com/400x300?text=Food+Chief",
        prepTime: parseInt(formData.prepTime),
        cookTime: parseInt(formData.cookTime),
        servings: parseInt(formData.servings),
        difficulty: formData.difficulty,
        ingredients: formData.ingredients
          .filter((i) => i.name && i.name.trim() && i.quantity && i.quantity.trim())
          .map((i) => ({
            name: i.name.trim(),
            quantity: i.quantity.trim(),
          })),
        instructions: formData.instructions
          .filter((i) => i.description && i.description.trim())
          .map((i, index) => ({
            step: index + 1,
            description: i.description.trim(),
          })),
        ustensiles: formData.ustensiles.filter((u) => u && u.trim()),
        author: formData.author || "Food Chief",
      };

      console.log("📦 Données nettoyées à envoyer:", cleanedData);
      console.log("📦 JSON:", JSON.stringify(cleanedData, null, 2));

      let response;
      
      if (isEditing && recipe && recipe._id) {
        console.log("📡 PUT /api/recipes/" + recipe._id);
        response = await recipeService.update(recipe._id, cleanedData);
      } else {
        console.log("📡 POST /api/recipes");
        response = await recipeService.create(cleanedData);
      }

      console.log("📬 Réponse du serveur:", response);

      if (response && response.success) {
        console.log("✅ SUCCÈS ! Données sauvegardées:", response.data);
        onSave(response.data);
      } else {
        const errorMsg = response?.message || "Une erreur est survenue";
        console.log("❌ Erreur serveur:", errorMsg);
        setError(errorMsg);
      }
    } catch (err) {
      console.error("💥 ERREUR CATCH:", err);
      console.error("💥 Stack:", err.stack);
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
      console.log("🏁 ========== FIN SOUMISSION ==========\n");
    }
  };

  // ====================================================
  // RENDU
  // ====================================================

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modale */}
          <motion.div
            className="fixed inset-0 flex items-start justify-center z-50 p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden my-8"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative p-6 border-b border-white/10">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 cursor-pointer p-2 rounded-full hover:bg-white/10 transition-all"
                >
                  <FiX className="w-6 h-6 text-white" />
                </button>

                <h2
                  className="text-4xl font-bold text-center bg-gradient-to-r from-orange-300 via-orange-400 to-orange-300 bg-clip-text text-transparent"
                  style={{ fontFamily: "var(--amatic)" }}
                >
                  {isEditing ? "Modifier la recette" : "Nouvelle recette"}
                </h2>
              </div>

              {/* Formulaire */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Erreur */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      className="flex items-center gap-3 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}>
                        {error}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Titre */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-300 mb-2"
                    style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
                  >
                    Titre de la recette *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Ex: Tarte aux pommes maison"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-all"
                    style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
                  />
                </div>

                {/* Description */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-300 mb-2"
                    style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
                  >
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Décrivez votre recette..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-all resize-none"
                    style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-300 mb-2"
                    style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
                  >
                    <FiImage className="inline w-4 h-4 mr-2" />
                    URL de l'image
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-all"
                    style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
                  />
                </div>

                {/* Infos (temps, portions, difficulté) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-300 mb-2"
                      style={{ fontFamily: "var(--caveat)", letterSpacing: "1px" }}
                    >
                      <FiClock className="inline w-4 h-4 mr-1" />
                      Prépa (min) *
                    </label>
                    <input
                      type="number"
                      name="prepTime"
                      value={formData.prepTime}
                      onChange={handleChange}
                      placeholder="15"
                      min="0"
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-all"
                      style={{ fontFamily: "var(--caveat)" }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-300 mb-2"
                      style={{ fontFamily: "var(--caveat)", letterSpacing: "1px" }}
                    >
                      <FiClock className="inline w-4 h-4 mr-1" />
                      Cuisson (min) *
                    </label>
                    <input
                      type="number"
                      name="cookTime"
                      value={formData.cookTime}
                      onChange={handleChange}
                      placeholder="30"
                      min="0"
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-all"
                      style={{ fontFamily: "var(--caveat)" }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-300 mb-2"
                      style={{ fontFamily: "var(--caveat)", letterSpacing: "1px" }}
                    >
                      <FiUsers className="inline w-4 h-4 mr-1" />
                      Portions *
                    </label>
                    <input
                      type="number"
                      name="servings"
                      value={formData.servings}
                      onChange={handleChange}
                      placeholder="4"
                      min="1"
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-all"
                      style={{ fontFamily: "var(--caveat)" }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-300 mb-2"
                      style={{ fontFamily: "var(--caveat)", letterSpacing: "1px" }}
                    >
                      Difficulté *
                    </label>
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleChange}
                      className="w-full px-3 py-2 cursor-pointer bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-orange-400 transition-all appearance-none"
                      style={{ fontFamily: "var(--caveat)" }}
                    >
                      <option value="Facile" className="bg-gray-800">Facile</option>
                      <option value="Moyen" className="bg-gray-800">Moyen</option>
                      <option value="Difficile" className="bg-gray-800">Difficile</option>
                    </select>
                  </div>
                </div>

                {/* Ingrédients */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-300 mb-3"
                    style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
                  >
                    Ingrédients * (nom + quantité)
                  </label>
                  <div className="space-y-2">
                    {formData.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={ingredient.name || ""}
                          onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                          placeholder="Nom (ex: Farine)"
                          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-all"
                          style={{ fontFamily: "var(--caveat)", letterSpacing: "1px" }}
                        />
                        <input
                          type="text"
                          value={ingredient.quantity || ""}
                          onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}
                          placeholder="Qté (ex: 250g)"
                          className="w-28 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-all"
                          style={{ fontFamily: "var(--caveat)", letterSpacing: "1px" }}
                        />
                        {formData.ingredients.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeIngredient(index)}
                            className="p-2 rounded-xl cursor-pointer bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addIngredient}
                    className="mt-3 flex items-center cursor-pointer gap-2 text-orange-400 hover:text-orange-300 transition-colors"
                    style={{ fontFamily: "var(--caveat)", letterSpacing: "1px" }}
                  >
                    <FiPlus className="w-4 h-4" />
                    Ajouter un ingrédient
                  </button>
                </div>

                {/* Instructions */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-300 mb-3"
                    style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
                  >
                    Instructions *
                  </label>
                  <div className="space-y-2">
                    {formData.instructions.map((instruction, index) => (
                      <div key={index} className="flex gap-2">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-sm">
                          {index + 1}
                        </span>
                        <textarea
                          value={instruction.description || ""}
                          onChange={(e) => handleInstructionChange(index, e.target.value)}
                          placeholder={`Décrivez l'étape ${index + 1}...`}
                          rows={2}
                          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-all resize-none"
                          style={{ fontFamily: "var(--caveat)", letterSpacing: "1px" }}
                        />
                        {formData.instructions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeInstruction(index)}
                            className="p-2 rounded-xl cursor-pointer bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all self-start"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addInstruction}
                    className="mt-3 flex items-center cursor-pointer gap-2 text-orange-400 hover:text-orange-300 transition-colors"
                    style={{ fontFamily: "var(--caveat)", letterSpacing: "1px" }}
                  >
                    <FiPlus className="w-4 h-4" />
                    Ajouter une étape
                  </button>
                </div>

                {/* Ustensiles */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-300 mb-3"
                    style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
                  >
                    Ustensiles (optionnel)
                  </label>
                  <div className="space-y-2">
                    {formData.ustensiles.map((ustensile, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={ustensile || ""}
                          onChange={(e) => handleUstensileChange(index, e.target.value)}
                          placeholder={`Ustensile ${index + 1} (ex: Fouet)`}
                          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-all"
                          style={{ fontFamily: "var(--caveat)", letterSpacing: "1px" }}
                        />
                        {formData.ustensiles.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeUstensile(index)}
                            className="p-2 rounded-xl cursor-pointer bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addUstensile}
                    className="mt-3 flex items-center cursor-pointer gap-2 text-orange-400 hover:text-orange-300 transition-colors"
                    style={{ fontFamily: "var(--caveat)", letterSpacing: "1px" }}
                  >
                    <FiPlus className="w-4 h-4" />
                    Ajouter un ustensile
                  </button>
                </div>

                {/* Boutons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 text-xl cursor-pointer rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 transition-all"
                    style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
                  >
                    Annuler
                  </button>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 text-xl cursor-pointer rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                  >
                    {loading
                      ? "Enregistrement..."
                      : isEditing
                      ? "Mettre à jour"
                      : "Créer la recette"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalRecipe;