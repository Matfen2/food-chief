import { useState, useEffect, useRef } from "react";
import { FiChevronDown, FiX, FiRefreshCw } from "react-icons/fi";

const FilterBar = ({ onFilterChange, totalRecipes }) => {
  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const [appareilsOpen, setAppareilsOpen] = useState(false);
  
  const [searchIngredient, setSearchIngredient] = useState("");
  const [searchAppareil, setSearchAppareil] = useState("");
  
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedAppareils, setSelectedAppareils] = useState([]);
  
  // Listes complètes (récupéreration de l'API)
  const allIngredients = [
    "Ail", "Ananas", "Banane", "Basilic", "Beurre", "Carottes", 
    "Cannelle", "Citron", "Citron vert", "Concombre", "Coriandre",
    "Cuisses de poulet", "Gingembre", "Gousses d'ail", "Huile",
    "Lait de coco", "Lardons", "Œufs", "Oignon", "Parmesan",
    "Piment", "Poivre", "Pommes", "Sel", "Spaghetti", "Sucre",
    "Thon", "Thym", "Tomates", "Curcuma"
  ];
  
  const allAppareils = [
    "Blender", "Casserole", "Cocotte", "Couteau", "Cuiseur de riz",
    "Cuillère", "Fourchette", "Four", "Fouet", "Mixer", "Moule",
    "Passoire", "Planche à découper", "Poêle", "Saladier"
  ];

  // Refs pour détecter les clics à l'extérieur
  const ingredientsRef = useRef(null);
  const appareilsRef = useRef(null);

  // Fermer les dropdowns en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ingredientsRef.current && !ingredientsRef.current.contains(event.target)) {
        setIngredientsOpen(false);
      }
      if (appareilsRef.current && !appareilsRef.current.contains(event.target)) {
        setAppareilsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Envoyer les filtres au parent
  useEffect(() => {
    onFilterChange({
      ingredients: selectedIngredients,
      appareils: selectedAppareils,
    });
  }, [selectedIngredients, selectedAppareils]);

  // Filtrer les listes selon la recherche
  const filteredIngredients = allIngredients.filter(ing =>
    ing.toLowerCase().includes(searchIngredient.toLowerCase())
  );

  const filteredAppareils = allAppareils.filter(app =>
    app.toLowerCase().includes(searchAppareil.toLowerCase())
  );

  // Ajouter un filtre
  const addIngredient = (ingredient) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
    setSearchIngredient("");
  };

  const addAppareil = (appareil) => {
    if (!selectedAppareils.includes(appareil)) {
      setSelectedAppareils([...selectedAppareils, appareil]);
    }
    setSearchAppareil("");
  };

  // Supprimer un filtre
  const removeIngredient = (ingredient) => {
    setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
  };

  const removeAppareil = (appareil) => {
    setSelectedAppareils(selectedAppareils.filter(a => a !== appareil));
  };

  // Réinitialiser tous les filtres
  const resetFilters = () => {
    setSelectedIngredients([]);
    setSelectedAppareils([]);
    setSearchIngredient("");
    setSearchAppareil("");
  };

  return (
    <div className="mb-8">
      {/* Barre de filtres */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Dropdown Ingrédients */}
        <div className="relative" ref={ingredientsRef}>
          <button
            onClick={() => setIngredientsOpen(!ingredientsOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition"
            style={{ fontFamily: "var(--spbutch)" }}
          >
            Ingrédients
            <FiChevronDown className={`transition-transform ${ingredientsOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Menu dropdown */}
          {ingredientsOpen && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-gray-800 text-white rounded-lg shadow-xl z-50">
              {/* Barre de recherche */}
              <div className="p-3 border-b border-gray-700">
                <input
                  type="text"
                  placeholder="Chercher un ingrédient"
                  value={searchIngredient}
                  onChange={(e) => setSearchIngredient(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  style={{ fontFamily: "var(--spbutch)" }}
                />
              </div>

              {/* Liste d'ingrédients */}
              <div className="max-h-60 overflow-y-auto">
                {filteredIngredients.length > 0 ? (
                  filteredIngredients.map((ingredient) => (
                    <button
                      key={ingredient}
                      onClick={() => addIngredient(ingredient)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-700 transition"
                      style={{ fontFamily: "var(--spbutch)" }}
                    >
                      {ingredient}
                    </button>
                  ))
                ) : (
                  <p className="px-4 py-3 text-gray-400 text-sm">
                    Aucun ingrédient trouvé
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Dropdown Appareils */}
        <div className="relative" ref={appareilsRef}>
          <button
            onClick={() => setAppareilsOpen(!appareilsOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition"
            style={{ fontFamily: "var(--spbutch)" }}
          >
            Appareils
            <FiChevronDown className={`transition-transform ${appareilsOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Menu dropdown */}
          {appareilsOpen && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-gray-800 text-white rounded-lg shadow-xl z-50">
              {/* Barre de recherche */}
              <div className="p-3 border-b border-gray-700">
                <input
                  type="text"
                  placeholder="Chercher un appareil"
                  value={searchAppareil}
                  onChange={(e) => setSearchAppareil(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  style={{ fontFamily: "var(--spbutch)" }}
                />
              </div>

              {/* Liste d'appareils */}
              <div className="max-h-60 overflow-y-auto">
                {filteredAppareils.length > 0 ? (
                  filteredAppareils.map((appareil) => (
                    <button
                      key={appareil}
                      onClick={() => addAppareil(appareil)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-700 transition"
                      style={{ fontFamily: "var(--spbutch)" }}
                    >
                      {appareil}
                    </button>
                  ))
                ) : (
                  <p className="px-4 py-3 text-gray-400 text-sm">
                    Aucun appareil trouvé
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bouton Réinitialiser */}
        {(selectedIngredients.length > 0 || selectedAppareils.length > 0) && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            style={{ fontFamily: "var(--spbutch)" }}
          >
            <FiRefreshCw className="w-4 h-4" />
            Réinitialiser
          </button>
        )}

        {/* Compteur de recettes */}
        <div className="ml-auto text-gray-700 font-semibold" style={{ fontFamily: "var(--spbutch)" }}>
          {totalRecipes} recette{totalRecipes > 1 ? "s" : ""} trouvée{totalRecipes > 1 ? "s" : ""}
        </div>
      </div>

      {/* Tags actifs */}
      {(selectedIngredients.length > 0 || selectedAppareils.length > 0) && (
        <div className="flex flex-wrap gap-2">
          {selectedIngredients.map((ingredient) => (
            <span
              key={ingredient}
              className="flex items-center gap-2 px-3 py-1 bg-[var(--primary)] text-white rounded-full text-sm"
              style={{ fontFamily: "var(--spbutch)" }}
            >
              {ingredient}
              <button
                onClick={() => removeIngredient(ingredient)}
                className="hover:bg-white/20 rounded-full p-0.5 transition"
              >
                <FiX className="w-4 h-4" />
              </button>
            </span>
          ))}

          {selectedAppareils.map((appareil) => (
            <span
              key={appareil}
              className="flex items-center gap-2 px-3 py-1 bg-[var(--primary)] text-white rounded-full text-sm"
              style={{ fontFamily: "var(--spbutch)" }}
            >
              {appareil}
              <button
                onClick={() => removeAppareil(appareil)}
                className="hover:bg-white/20 rounded-full p-0.5 transition"
              >
                <FiX className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterBar;