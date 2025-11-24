import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/api.js";

// ====================================================
// CONTEXT D'AUTHENTIFICATION
// ====================================================

const AuthContext = createContext();

// ====================================================
// HOOK PERSONNALISÉ
// ====================================================

/**
 * Hook pour accéder au context d'authentification
 * Usage: const { user, login, logout, isAuthenticated } = useAuth();
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
};

// ====================================================
// PROVIDER
// ====================================================

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Charge l'utilisateur depuis localStorage au montage
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = authService.getCurrentUser();
        const isAuth = authService.isAuthenticated();

        if (storedUser && isAuth) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error("Erreur lors du chargement de l'utilisateur:", error);
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  /**
   * Inscription d'un nouvel utilisateur
   */
  const register = async (username, email, password) => {
    try {
      const response = await authService.register(username, email, password);
      
      if (response.success && response.data.user) {
        setUser(response.data.user);
        return { success: true, user: response.data.user };
      }
      
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  /**
   * Connexion d'un utilisateur
   */
  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      
      if (response.success && response.data.user) {
        setUser(response.data.user);
        return { success: true, user: response.data.user };
      }
      
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  /**
   * Déconnexion de l'utilisateur
   */
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  /**
   * Récupère le profil de l'utilisateur
   */
  const refreshProfile = async () => {
    try {
      const response = await authService.getProfile();
      
      if (response.success && response.data) {
        setUser(response.data);
        return { success: true, user: response.data };
      }
      
      return { success: false, message: response.message };
    } catch (error) {
      // Si erreur 401, déconnecte l'utilisateur
      if (error.message.includes("401") || error.message.includes("Token")) {
        logout();
      }
      return { success: false, message: error.message };
    }
  };

  /**
   * Met à jour le profil de l'utilisateur
   */
  const updateUserProfile = async (username, email) => {
    try {
      const response = await authService.updateProfile(username, email);
      
      if (response.success && response.data) {
        setUser(response.data);
        return { success: true, user: response.data };
      }
      
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  /**
   * Vérifie si l'utilisateur est authentifié
   */
  const isAuthenticated = () => {
    return user !== null && authService.isAuthenticated();
  };

  // ✅ Valeurs exposées par le context
  const value = {
    user,
    loading,
    register,
    login,
    logout,
    refreshProfile,
    updateUserProfile,
    isAuthenticated: isAuthenticated(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;