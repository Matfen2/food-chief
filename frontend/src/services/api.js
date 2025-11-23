// ====================================================
// SERVICE API - Food Chief
// Centralisation de toutes les requêtes API
// ====================================================

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ====================================================
// HELPERS PRIVÉS
// ====================================================

/**
 * Récupère le token JWT depuis le localStorage
 */
const getAuthToken = () => {
  return localStorage.getItem("token");
};

/**
 * Crée les headers pour les requêtes authentifiées
 */
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

/**
 * Gère les erreurs HTTP
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Erreur HTTP: ${response.status}`);
  }
  return response.json();
};

// ====================================================
// AUTHENTIFICATION (plus tard)
// ====================================================

// À implémenter plus tard

// ====================================================
// RECETTES - CRUD
// ====================================================

export const recipeService = {
  /**
   * Récupère toutes les recettes (avec recherche optionnelle)
   * @param {string} searchQuery - Terme de recherche optionnel
   */
  getAll: async (searchQuery = "") => {
    let url = `${API_BASE_URL}/recipes`;
    
    if (searchQuery && searchQuery.trim() !== "") {
      url += `?title=${encodeURIComponent(searchQuery)}`;
    }
    
    const response = await fetch(url, {
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },

  /**
   * Récupère une recette par son ID
   * @param {string} id - ID de la recette
   */
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },

  /**
   * Crée une nouvelle recette (plus tard)
   * @param {Object} recipeData - Données de la recette
   */
  create: async (recipeData) => {
    // À implémenter plus tard
    console.log("create() - À implémenter", recipeData);
  },

  /**
   * Met à jour une recette (plus tard)
   * @param {string} id - ID de la recette
   * @param {Object} recipeData - Données à mettre à jour
   */
  update: async (id, recipeData) => {
    // À implémenter plus tard
    console.log("update() - À implémenter", id, recipeData);
  },

  /**
   * Supprime une recette (plus tard)
   * @param {string} id - ID de la recette
   */
  delete: async (id) => {
    // À implémenter plus tard
    console.log("delete() - À implémenter", id);
  },

  /**
   * Toggle le statut favori d'une recette (plus tard)
   * @param {string} id - ID de la recette
   */
  toggleFavorite: async (id) => {
    // À implémenter plus tard
    console.log("toggleFavorite() - À implémenter", id);
  },

  /**
   * Récupère uniquement les recettes favorites (plus tard)
   */
  getFavorites: async () => {
    // À implémenter plus tard
    console.log("getFavorites() - À implémenter");
  },
};

// ====================================================
// UTILISATEUR (plus tard)
// ====================================================

// À implémenter plus tard

// ====================================================
// CATÉGORIES (plus tard)
// ====================================================

// À implémenter plus tard

// ====================================================
// EXPORT PAR DÉFAUT (pour les imports groupés)
// ====================================================

export default {
  recipe: recipeService,
};