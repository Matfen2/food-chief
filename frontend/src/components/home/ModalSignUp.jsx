import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiX, FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { useAuth } from "../../context/authContext";

const ModalSignUp = ({ isOpen, onClose, onSwitchToLogin }) => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ====================================================
  // VALIDATION
  // ====================================================

  const validateForm = () => {
    // Username
    if (formData.username.length < 3) {
      setError("Le nom d'utilisateur doit contenir au moins 3 caractères");
      return false;
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Format d'email invalide");
      return false;
    }

    // Password
    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return false;
    }

    // Confirmation password
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return false;
    }

    return true;
  };

  // ====================================================
  // INDICATEUR DE FORCE DU MOT DE PASSE
  // ====================================================

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "" };
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;

    const levels = [
      { strength: 0, label: "", color: "" },
      { strength: 1, label: "Faible", color: "bg-red-500" },
      { strength: 2, label: "Moyen", color: "bg-yellow-500" },
      { strength: 3, label: "Bon", color: "bg-blue-500" },
      { strength: 4, label: "Fort", color: "bg-green-500" },
      { strength: 5, label: "Très fort", color: "bg-green-600" },
    ];

    return levels[strength];
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // ====================================================
  // GESTION DU FORMULAIRE
  // ====================================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Efface l'erreur quand l'utilisateur tape
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ Validation
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // ✅ Appel API via le context
      const result = await register(formData.username, formData.email, formData.password);

      if (result.success) {
        // ✅ Inscription réussie → Redirige vers Dashboard
        onClose();
        navigate("/dashboard");
      } else {
        setError(result.message || "Une erreur est survenue lors de l'inscription");
      }
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
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
            className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div
              className="relative w-full max-w-md bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Effet de brillance animé */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
              />

              {/* Header */}
              <div className="relative p-8">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full cursor-pointer hover:bg-white/10 transition-all"
                >
                  <FiX className="w-6 h-6 text-white" />
                </button>

                <motion.h2
                  className="text-4xl font-bold text-center bg-gradient-to-r from-orange-300 via-orange-400 to-orange-300 bg-clip-text text-transparent"
                  style={{ fontFamily: "var(--amatic)" }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Inscription
                </motion.h2>
              </div>

              {/* Formulaire */}
              <form onSubmit={handleSubmit} className="relative p-8 -mt-8 space-y-6">
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
                      <span
                        className="text-sm"
                        style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
                      >
                        {error}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Username */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-300 mb-2"
                    style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
                  >
                    Nom d'utilisateur
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="johndoe"
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-all"
                      style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
                      required
                    />
                    {formData.username.length >= 3 && (
                      <FiCheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400" />
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                    style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
                  >
                    Email
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="votre@email.com"
                      className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-all"
                      style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
                      required
                    />
                  </div>
                </div>

                {/* Mot de passe */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300 mb-2"
                    style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
                  >
                    Mot de passe
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-all"
                      style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Indicateur de force */}
                  {formData.password && (
                    <motion.div
                      className="mt-2"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full ${
                              i < passwordStrength.strength ? passwordStrength.color : "bg-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <p
                        className="text-xs text-gray-400"
                        style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
                      >
                        Force : {passwordStrength.label || "Trop court"}
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Confirmation mot de passe */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-300 mb-2"
                    style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
                  >
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-all"
                      style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 cursor-pointer -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                    </button>
                    {formData.confirmPassword && formData.password === formData.confirmPassword && (
                      <FiCheckCircle className="absolute right-12 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400" />
                    )}
                  </div>
                </div>

                {/* Bouton d'inscription */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  {loading ? "Inscription..." : "S'inscrire"}
                </motion.button>

                {/* Lien vers connexion */}
                <p
                  className="text-center text-gray-300 text-sm"
                  style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
                >
                  Déjà un compte ?{" "}
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-orange-400 hover:text-orange-300 font-semibold cursor-pointer transition-colors"
                  >
                    Se connecter
                  </button>
                </p>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalSignUp;