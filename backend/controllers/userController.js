import User from '../models/userModels.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ====================================================
// HELPERS PRIVÉS
// ====================================================

/**
 * Génère un JWT token
 */
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

/**
 * Valide le format de l'email
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valide la force du mot de passe
 */
const isValidPassword = (password) => {
  // Au moins 6 caractères
  return password && password.length >= 6;
};

// ====================================================
// INSCRIPTION (REGISTER)
// ====================================================

/**
 * Créer un nouveau compte utilisateur
 * POST /api/users/register
 */
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // ✅ VALIDATION DES DONNÉES
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Tous les champs sont requis (username, email, password)",
      });
    }

    // ✅ Valider le format email
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Format d'email invalide",
      });
    }

    // ✅ Valider la force du password
    if (!isValidPassword(password)) {
      return res.status(400).json({
        success: false,
        message: "Le mot de passe doit contenir au moins 6 caractères",
      });
    }

    // ✅ Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      const field = existingUser.email === email ? "email" : "username";
      return res.status(409).json({
        success: false,
        message: `Cet ${field} est déjà utilisé`,
      });
    }

    // ✅ HASHER LE MOT DE PASSE (SÉCURITÉ CRITIQUE)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Créer l'utilisateur avec le password hashé
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // ✅ Password hashé, pas en clair
    });

    const savedUser = await newUser.save();

    // ✅ Générer un JWT token
    const token = generateToken(savedUser._id);

    // ✅ IMPORTANT : Ne JAMAIS renvoyer le password (même hashé)
    const userResponse = {
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
    };

    res.status(201).json({
      success: true,
      message: "Utilisateur créé avec succès",
      data: {
        user: userResponse,
        token, // ✅ Token pour authentification
      },
    });

  } catch (error) {
    console.error("Erreur register:", error);
    
    // ✅ Gestion des erreurs de validation Mongoose
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    // ✅ Erreur générique (ne pas exposer les détails)
    res.status(500).json({
      success: false,
      message: "Erreur lors de la création de l'utilisateur",
    });
  }
};

// ====================================================
// CONNEXION (LOGIN)
// ====================================================

/**
 * Connecter un utilisateur
 * POST /api/users/login
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ VALIDATION DES DONNÉES
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email et mot de passe requis",
      });
    }

    // ✅ Valider le format email
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Format d'email invalide",
      });
    }

    // ✅ Trouver l'utilisateur par email
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      // ✅ Message générique pour la sécurité
      // (ne pas révéler si l'email existe ou pas)
      return res.status(401).json({
        success: false,
        message: "Email ou mot de passe incorrect",
      });
    }

    // ✅ COMPARER LE PASSWORD AVEC BCRYPT
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Email ou mot de passe incorrect",
      });
    }

    // ✅ Générer un JWT token
    const token = generateToken(user._id);

    // ✅ IMPORTANT : Ne JAMAIS renvoyer le password
    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    res.status(200).json({
      success: true,
      message: "Connexion réussie",
      data: {
        user: userResponse,
        token, // ✅ Token pour authentification
      },
    });

  } catch (error) {
    console.error("Erreur login:", error);
    
    // ✅ Erreur générique (ne pas exposer les détails)
    res.status(500).json({
      success: false,
      message: "Erreur lors de la connexion",
    });
  }
};

// ====================================================
// RÉCUPÉRER LE PROFIL (optionnel, pour plus tard)
// ====================================================

/**
 * Récupérer le profil de l'utilisateur connecté
 * GET /api/users/profile
 * Requiert un token JWT valide
 */
export const getUserProfile = async (req, res) => {
  try {
    // req.user est ajouté par le middleware d'authentification
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error) {
    console.error("Erreur getUserProfile:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération du profil",
    });
  }
};

// ====================================================
// METTRE À JOUR LE PROFIL (optionnel, pour plus tard)
// ====================================================

/**
 * Mettre à jour le profil utilisateur
 * PUT /api/users/profile
 * Requiert un token JWT valide
 */
export const updateUserProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }

    // ✅ Mettre à jour uniquement les champs fournis
    if (username) user.username = username;
    if (email) {
      if (!isValidEmail(email)) {
        return res.status(400).json({
          success: false,
          message: "Format d'email invalide",
        });
      }
      user.email = email;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Profil mis à jour avec succès",
      data: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
      },
    });

  } catch (error) {
    console.error("Erreur updateUserProfile:", error);
    
    // ✅ Gestion des duplicatas (email/username déjà pris)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({
        success: false,
        message: `Ce ${field} est déjà utilisé`,
      });
    }

    res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour du profil",
    });
  }
};