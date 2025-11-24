import { motion, AnimatePresence } from "framer-motion";
import { FiAlertTriangle, FiX } from "react-icons/fi";

const ModalConfirmDelete = ({ isOpen, onClose, onConfirm, recipeName }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modale */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div
              className="relative w-full max-w-md bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Bouton fermer */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 cursor-pointer p-2 rounded-full hover:bg-white/10 transition-all z-10"
              >
                <FiX className="w-5 h-5 text-white" />
              </button>

              {/* Contenu */}
              <div className="p-8 text-center">
                {/* Icône d'avertissement */}
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                >
                  <FiAlertTriangle className="w-10 h-10 text-red-400" />
                </motion.div>

                {/* Titre */}
                <h3
                  className="text-4xl font-bold text-white mb-4"
                  style={{ fontFamily: "var(--amatic)" }}
                >
                  Supprimer la recette ?
                </h3>

                {/* Message */}
                <p
                  className="text-gray-300 text-lg mb-8"
                  style={{ fontFamily: "var(--caveat)", letterSpacing: "3px" }}
                >
                  Êtes-vous sûr de vouloir supprimer{" "}
                  <span className="text-orange-400 font-semibold">
                    "{recipeName}"
                  </span>
                  {" "}? Cette action est irréversible.
                </p>

                {/* Boutons */}
                <div className="flex gap-4">
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 cursor-pointer text-xl rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 transition-all"
                    style={{ fontFamily: "var(--caveat)", letterSpacing: "3px" }}
                  >
                    Annuler
                  </button>
                  <motion.button
                    onClick={onConfirm}
                    className="flex-1 py-3 cursor-pointer text-xl rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-xl shadow-red-500/30 hover:shadow-red-500/50 transition-all"
                    style={{ fontFamily: "var(--caveat)", letterSpacing: "3px" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Supprimer
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalConfirmDelete;