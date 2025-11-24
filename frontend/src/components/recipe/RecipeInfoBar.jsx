import { motion } from "framer-motion";
import { FiMinus, FiPlus, FiCalendar } from "react-icons/fi";

const RecipeInfoBar = ({ 
  servings, 
  onIncrement, 
  onDecrement, 
  totalTime, 
  author, 
  createdAt,
  difficulty
}) => {
  // Fonction pour formater la date
  const formatDate = (dateString) => {
    if (!dateString) return "Date inconnue";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Date invalide";
    
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Couleurs de difficulté
  const getDifficultyStyle = (level) => {
    const styles = {
      facile: {
        bg: "from-green-500 to-emerald-600",
        glow: "shadow-green-500/50",
        icon: "🌱"
      },
      moyen: {
        bg: "from-yellow-500 to-orange-500",
        glow: "shadow-yellow-500/50",
        icon: "⚡"
      },
      difficile: {
        bg: "from-red-500 to-rose-600",
        glow: "shadow-red-500/50",
        icon: "🔥"
      },
    };
    
    return styles[level?.toLowerCase()] || {
      bg: "from-gray-500 to-gray-600",
      glow: "shadow-gray-500/50",
      icon: "📌"
    };
  };

  const difficultyStyle = getDifficultyStyle(difficulty);

  return (
    <motion.div
      className="w-full max-w-5xl mb-8 sm:mb-10 md:mb-12 -mt-2 sm:-mt-4 md:-mt-6 px-2 sm:px-0"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      {/* Carte principale avec glassmorphism */}
      <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
        {/* Effet de brillance animé */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 2
          }}
        />

        <div className="relative px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
          {/* ====================================================
              GRILLE RESPONSIVE - 2x2 sur mobile, 4 cols sur desktop
              ==================================================== */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            
            {/* ====================================================
                PERSONNES - ✅ Responsive
                ==================================================== */}
            <motion.div 
              className="flex flex-col items-center gap-2 sm:gap-3 group"
              whileHover={{ scale: 1.05 }}
            >
              <span
                style={{ fontFamily: 'var(--caveat)', letterSpacing: '2px' }} 
                className="text-sm sm:text-base md:text-xl font-medium text-gray-300 uppercase tracking-wide">
                Personnes
              </span>
              
              <div className="flex items-center gap-1.5 sm:gap-2">
                <motion.button
                  onClick={onDecrement}
                  disabled={servings <= 1}
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-white/20 to-white/10 hover:from-orange-500/30 hover:to-orange-600/30 flex items-center justify-center transition-all shadow-lg disabled:opacity-30 disabled:cursor-not-allowed border border-white/10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiMinus className="w-3 h-3 sm:w-4 sm:h-4 cursor-pointer" />
                </motion.button>
                
                <motion.span 
                  className="text-2xl sm:text-2xl md:text-3xl font-bold min-w-[1.5rem] sm:min-w-[2rem] text-center bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent"
                  key={servings}
                  style={{ fontFamily: 'var(--caveat)', letterSpacing: '2px' }}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {servings}
                </motion.span>
                
                <motion.button
                  onClick={onIncrement}
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-white/20 to-white/10 hover:from-orange-500/30 hover:to-orange-600/30 flex items-center justify-center transition-all shadow-lg border border-white/10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiPlus className="w-3 h-3 sm:w-4 sm:h-4 cursor-pointer" />
                </motion.button>
              </div>
            </motion.div>

            {/* ====================================================
                TEMPS - ✅ Responsive
                ==================================================== */}
            <motion.div 
              className="flex flex-col items-center gap-1 sm:gap-2 group"
              whileHover={{ scale: 1.05 }}
            >
              <span 
                style={{ fontFamily: 'var(--caveat)', letterSpacing: '2px' }} 
                className="text-sm sm:text-base md:text-xl font-medium text-gray-300 uppercase tracking-wide">
                Temps total
              </span>
              <span
                style={{ fontFamily: 'var(--caveat)', letterSpacing: '2px' }} 
                className="text-xl sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                {totalTime} min
              </span>
            </motion.div>

            {/* ====================================================
                AUTEUR - ✅ Responsive
                ==================================================== */}
            <motion.div 
              className="flex flex-col items-center gap-1 sm:gap-2 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <span 
                style={{ fontFamily: 'var(--caveat)', letterSpacing: '2px' }} 
                className="text-sm sm:text-base md:text-xl font-medium text-gray-300 uppercase tracking-wide">
                Posté par
              </span>
              <span 
                className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate max-w-full"
                style={{ fontFamily: 'var(--caveat)', letterSpacing: '2px' }}>
                {author || "Chef anonyme"}
              </span>
              <div 
                className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-lg text-gray-400"
                style={{ fontFamily: 'var(--caveat)', letterSpacing: '1px' }}
              >
                <FiCalendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-300" />
                <span className="font-medium text-gray-300">{formatDate(createdAt)}</span>
              </div>
            </motion.div>

            {/* ====================================================
                DIFFICULTÉ - ✅ Responsive
                ==================================================== */}
            <motion.div 
              className="flex flex-col items-center gap-2 sm:gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <span
                style={{ fontFamily: 'var(--caveat)', letterSpacing: '2px' }} 
                className="text-sm sm:text-base md:text-xl font-medium text-gray-300 uppercase tracking-wide">
                Difficulté
              </span>
              
              <motion.div
                className={`relative px-3 sm:px-4 py-2 sm:py-3 rounded-full bg-gradient-to-r ${difficultyStyle.bg} shadow-xl ${difficultyStyle.glow} border border-white/20`}
                animate={{
                  boxShadow: [
                    `0 10px 30px ${difficultyStyle.glow}`,
                    `0 10px 40px ${difficultyStyle.glow}`,
                    `0 10px 30px ${difficultyStyle.glow}`
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={{ scale: 1.1 }}
              >
                <span 
                  className="font-bold text-white text-sm sm:text-base md:text-xl capitalize flex items-center gap-1.5 sm:gap-2"
                  style={{ fontFamily: 'var(--caveat)', letterSpacing: '2px' }}>
                  <span className="text-base sm:text-lg">{difficultyStyle.icon}</span>
                  <span className="hidden xs:inline">{difficulty}</span>
                  {/* Version courte sur très petit écran */}
                  <span className="xs:hidden">
                    {difficulty?.slice(0, 3)}
                  </span>
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeInfoBar;