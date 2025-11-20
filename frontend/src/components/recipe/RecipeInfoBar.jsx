import { motion } from "framer-motion";
import DifficultyBadge from "./DifficultyBadge";
import { FiClock, FiMinus, FiPlus, FiUser } from "react-icons/fi";
import { formatDate } from "../../utils/recipeUtils";

const ANIMATION_VARIANTS = {
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }
};

const RecipeInfoBar = ({ 
  servings, 
  onIncrement, 
  onDecrement, 
  totalTime, 
  author, 
  createdAt,
  difficulty  // ← Ajout de la prop difficulty
}) => {
  return (
    <motion.div
      className="w-full max-w-4xl mb-8"
      variants={ANIMATION_VARIANTS.item}
    >
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl px-8 py-5 border border-white/20 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Personnes */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <FiUser className="w-5 h-5 text-orange-400" />
              <span className="text-sm font-medium text-gray-300" style={{ fontFamily: "var(--spbutch)" }}>
                Personnes
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onDecrement}
                disabled={servings <= 1}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 flex items-center justify-center transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
                aria-label="Diminuer le nombre de personnes"
              >
                <FiMinus className="w-4 h-4" />
              </button>
              <span className="text-2xl font-bold min-w-[3rem] text-center bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent">
                {servings}
              </span>
              <button
                onClick={onIncrement}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 flex items-center justify-center transition-all shadow-lg hover:scale-110 active:scale-95"
                aria-label="Augmenter le nombre de personnes"
              >
                <FiPlus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Temps */}
          <div className="flex items-center gap-3">
            <FiClock className="w-5 h-5 text-orange-400" />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-400" style={{ fontFamily: "var(--spbutch)" }}>
                Temps de préparation
              </span>
              <span className="text-xl font-bold">{totalTime} min</span>
            </div>
          </div>

          {/* Auteur et date */}
          <div className="text-sm text-center text-gray-300" style={{ fontFamily: "var(--spbutch)" }}>
            <div className="flex flex-col gap-1">
              <div>
                Posté par <span className="text-white font-semibold">{author || "Chef anonyme"}</span>
              </div>
              <div className="text-xs text-gray-400">
                le <span className="text-gray-300">{formatDate(createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Badge Difficulté */}
          <DifficultyBadge difficulty={difficulty} />
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeInfoBar;