import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiLogOut, FiUser } from "react-icons/fi";
import { useAuth } from "../context/authContext";
import ModalLogin from "../components/home/ModalLogin";
import ModalSignUp from "../components/home/ModalSignUp";
import logoSite from "../../public/images/foodChiefLogo.png";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // ====================================================
  // GESTION DES MODALES
  // ====================================================

  const openLoginModal = () => {
    setShowLoginModal(true);
    setShowSignUpModal(false);
  };

  const openSignUpModal = () => {
    setShowSignUpModal(true);
    setShowLoginModal(false);
  };

  const closeModals = () => {
    setShowLoginModal(false);
    setShowSignUpModal(false);
  };

  // ====================================================
  // DÉCONNEXION
  // ====================================================

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  // ====================================================
  // RENDU
  // ====================================================

  return (
    <>
      <header className="flex flex-row mx-2 sm:mx-4 items-center justify-between">
        <Link to="/">
          <img src={logoSite} alt="Food Chief Logo" className="h-34 w-auto" />
        </Link>

        {/* Si connecté : Menu utilisateur */}
        {isAuthenticated ? (
          <div className="relative">
            <motion.button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2 rounded-xl cursor-pointer font-semibold transition-all hover:bg-opacity-90"
              style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-lg font-bold">
                  {user?.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="hidden sm:inline text-xl">{user?.username}</span>
            </motion.button>

            {/* Menu déroulant */}
            <AnimatePresence>
              {showUserMenu && (
                <>
                  {/* Overlay pour fermer le menu */}
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setShowUserMenu(false)}
                  />

                  <motion.div
                    className="absolute right-0 mt-2 w-56 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden z-40"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-4 border-b border-white/10">
                      <p
                        className="text-sm text-gray-400 mb-1"
                        style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
                      >
                        Connecté en tant que
                      </p>
                      <p
                        className="font-semibold text-white truncate"
                        style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
                      >
                        {user?.email}
                      </p>
                    </div>

                    <div className="p-2">
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/10 transition-all"
                        style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
                        onClick={() => setShowUserMenu(false)}
                      >
                        <FiUser className="w-5 h-5 text-orange-400" />
                        <span>Mon profil</span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-red-500/20 transition-all"
                        style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
                      >
                        <FiLogOut className="w-5 h-5 text-red-400" />
                        <span>Se déconnecter</span>
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        ) : (
          // Si non connecté : Bouton de connexion
          <motion.button
            onClick={openLoginModal}
            style={{ fontFamily: "var(--caveat)", letterSpacing: "2px" }}
            className="relative bg-[var(--primary)] text-white px-4 py-2 rounded-xl cursor-pointer font-semibold overflow-hidden text-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Se connecter
          </motion.button>
        )}
      </header>

      {/* Modales */}
      <ModalLogin
        isOpen={showLoginModal}
        onClose={closeModals}
        onSwitchToSignUp={openSignUpModal}
      />
      <ModalSignUp
        isOpen={showSignUpModal}
        onClose={closeModals}
        onSwitchToLogin={openLoginModal}
      />
    </>
  );
};

export default Header;