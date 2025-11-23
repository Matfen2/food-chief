import jwt from 'jsonwebtoken';
import User from '../models/userModels.js';

// Middleware d'authentification - Protection des routes
export const protect = async (req, res, next) => {
  try {
    let token;

    // ✅ Récupérer le token depuis le header Authorization
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Format attendu : "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];
    }

    // ✅ Vérifier que le token existe
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Non autorisé - Token manquant",
      });
    }

    // ✅ Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Récupérer l'utilisateur depuis la DB (sans le password)
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Non autorisé - Utilisateur non trouvé",
      });
    }

    // ✅ Token valide, utilisateur trouvé → passer au prochain middleware
    next();

  } catch (error) {
    console.error("Erreur middleware protect:", error.message);

    // ✅ Gérer les erreurs de token
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: "Non autorisé - Token invalide",
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Non autorisé - Token expiré",
      });
    }

    // ✅ Erreur générique
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de l'authentification",
    });
  }
};

// Autorisation administrateur
export const isAdmin = (req, res, next) => {
  // ✅ req.user existe car protect est appelé avant
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Accès refusé - Droits administrateur requis",
    });
  }
};