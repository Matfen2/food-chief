import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";
import { DIFFICULTY_COLORS } from "../../utils/recipeUtils";

const ANIMATION_VARIANTS = {
  item: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  }
};

const DifficultyBadge = ({ difficulty }) => {
  return (
    <motion.div 
      className="flex flex-col items-center gap-2"
      variants={ANIMATION_VARIANTS.item}
    >
      <div className="flex items-center gap-2">
        <FiAward className="w-5 h-5 text-orange-400" />
        <span className="text-xs font-medium text-gray-400" style={{ fontFamily: "var(--spbutch)" }}>
          Difficulté
        </span>
      </div>
      <span
        className={`inline-block px-6 py-2 rounded-full font-semibold text-sm shadow-xl border border-white/20 ${DIFFICULTY_COLORS[difficulty]}`}
        style={{ fontFamily: "var(--spbutch)" }}
      >
        {difficulty}
      </span>
    </motion.div>
  );
};

export default DifficultyBadge;