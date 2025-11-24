// ====================================================
// SERVICE API - Food Chief
// Centralisation de toutes les requêtes API
// ====================================================

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

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
 * Sauvegarde le token JWT dans localStorage
 */
const saveAuthToken = (token) => {
  localStorage.setItem("token", token);
};

/**
 * Supprime le token JWT de localStorage
 */
const removeAuthToken = () => {
  localStorage.removeItem("token");
};

/**
 * Sauvegarde les données utilisateur dans localStorage
 */
const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

/**
 * Récupère les données utilisateur depuis localStorage
 */
const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

/**
 * Supprime les données utilisateur de localStorage
 */
const removeUser = () => {
  localStorage.removeItem("user");
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
// AUTHENTIFICATION
// ====================================================

export const authService = {
  /**
   * Inscription d'un nouvel utilisateur
   * @param {string} username - Nom d'utilisateur
   * @param {string} email - Email
   * @param {string} password - Mot de passe
   */
  register: async (username, email, password) => {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await handleResponse(response);

    // ✅ Sauvegarde le token et l'utilisateur
    if (data.success && data.data.token) {
      saveAuthToken(data.data.token);
      saveUser(data.data.user);
    }

    return data;
  },

  /**
   * Connexion d'un utilisateur
   * @param {string} email - Email
   * @param {string} password - Mot de passe
   */
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await handleResponse(response);

    // ✅ Sauvegarde le token et l'utilisateur
    if (data.success && data.data.token) {
      saveAuthToken(data.data.token);
      saveUser(data.data.user);
    }

    return data;
  },

  /**
   * Déconnexion (supprime token et user du localStorage)
   */
  logout: () => {
    removeAuthToken();
    removeUser();
  },

  /**
   * Récupère le profil de l'utilisateur connecté
   */
  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await handleResponse(response);

    // ✅ Met à jour l'utilisateur dans localStorage
    if (data.success && data.data) {
      saveUser(data.data);
    }

    return data;
  },

  /**
   * Met à jour le profil de l'utilisateur
   * @param {string} username - Nouveau nom d'utilisateur
   * @param {string} email - Nouvel email
   */
  updateProfile: async (username, email) => {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ username, email }),
    });

    const data = await handleResponse(response);

    // ✅ Met à jour l'utilisateur dans localStorage
    if (data.success && data.data) {
      saveUser(data.data);
    }

    return data;
  },

  /**
   * Vérifie si l'utilisateur est authentifié
   */
  isAuthenticated: () => {
    return !!getAuthToken() && getUser() !== null;
  },

  /**
   * Récupère l'utilisateur depuis localStorage
   */
  getCurrentUser: () => {
    return getUser();
  },
};

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
   * Crée une nouvelle recette
   * @param {Object} recipeData - Données de la recette
   */
  create: async (recipeData) => {
    const response = await fetch(`${API_BASE_URL}/recipes`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(recipeData),
    });
    
    return handleResponse(response);
  },

  /**
   * Met à jour une recette
   * @param {string} id - ID de la recette
   * @param {Object} recipeData - Données à mettre à jour
   */
  update: async (id, recipeData) => {
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(recipeData),
    });
    
    return handleResponse(response);
  },

  /**
   * Supprime une recette
   * @param {string} id - ID de la recette
   */
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },

  /**
   * Toggle le statut favori d'une recette (à implémenter côté backend)
   * @param {string} id - ID de la recette
   */
  toggleFavorite: async (id) => {
    // À implémenter quand le backend sera prêt
    const response = await fetch(`${API_BASE_URL}/recipes/${id}/favorite`, {
      method: "POST",
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },

  /**
   * Récupère uniquement les recettes favorites (à implémenter côté backend)
   */
  getFavorites: async () => {
    // À implémenter quand le backend sera prêt
    const response = await fetch(`${API_BASE_URL}/recipes/favorites`, {
      headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
  },
};


// ====================================================
// EXPORT PAR DÉFAUT (pour les imports groupés)
// ====================================================

export default {
  auth: authService,
  recipe: recipeService,
};