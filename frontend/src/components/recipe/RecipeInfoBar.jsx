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
      className="w-full max-w-5xl mb-12 -mt-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      {/* Carte principale avec glassmorphism amélioré */}
      <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
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

        <div className="relative px-8 py-6">
          <div className="flex flex-wrap items-center justify-between gap-8">
            
            {/* Personnes avec animation */}
            <motion.div 
              className="flex flex-col items-center gap-3 group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2">
                <span
                  style={{ fontFamily: 'var(--caveat)', letterSpacing: '3px' }} 
                  className="text-xl font-medium text-gray-300 uppercase tracking-wide">
                  Personnes
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={onDecrement}
                  disabled={servings <= 1}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/10 hover:from-orange-500/30 hover:to-orange-600/30 flex items-center justify-center transition-all shadow-lg disabled:opacity-30 disabled:cursor-not-allowed border border-white/10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiMinus className="w-4 h-4 cursor-pointer" />
                </motion.button>
                
                <motion.span 
                  className="text-3xl font-bold min-w-[2rem] text-center bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent"
                  key={servings}
                  style={{ fontFamily: 'var(--caveat)', letterSpacing: '3px' }}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {servings}
                </motion.span>
                
                <motion.button
                  onClick={onIncrement}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/10 hover:from-orange-500/30 hover:to-orange-600/30 flex items-center justify-center transition-all shadow-lg border border-white/10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiPlus className="w-4 h-4 cursor-pointer" />
                </motion.button>
              </div>
            </motion.div>

            {/* Temps avec animation pulsante */}
            <motion.div 
              className="flex items-center gap-4 group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex flex-col text-center">
                <span 
                  style={{ fontFamily: 'var(--caveat)', letterSpacing: '3px' }} 
                  className="text-xl font-medium text-gray-300 uppercase tracking-wide">
                  Temps total
                </span>
                <span
                  style={{ fontFamily: 'var(--caveat)', letterSpacing: '3px' }} 
                  className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  {totalTime} min
                </span>
              </div>
            </motion.div>

            {/* Auteur et date */}
            <motion.div 
              className="flex flex-col gap-2 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2 justify-center">
                <span 
                  style={{ fontFamily: 'var(--caveat)', letterSpacing: '3px' }} 
                  className="text-xl font-medium text-gray-300 uppercase tracking-wide">Posté par</span>
              </div>
              <span 
                className="text-2xl font-bold text-white"
                style={{ fontFamily: 'var(--caveat)', letterSpacing: '3px' }}>
                {author || "Chef anonyme"}
              </span>
              <div 
                className="flex items-center gap-2 justify-center text-lg text-gray-400"
                style={{ fontFamily: 'var(--caveat)', letterSpacing: '3px' }}
              >
                <FiCalendar className="w-3 h-3 text-gray-300 uppercase tracking-wide" />
                <span className="font-medium text-gray-300 uppercase tracking-wide">{formatDate(createdAt)}</span>
              </div>
            </motion.div>

            {/* Badge difficulté avec glow */}
            <motion.div 
              className="flex flex-col items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2">
                <span
                  style={{ fontFamily: 'var(--caveat)', letterSpacing: '3px' }} 
                  className="text-xl font-medium text-gray-300 uppercase tracking-wide">
                  Difficulté
                </span>
              </div>
              
              <motion.div
                className={`relative px-3 py-3 rounded-full bg-gradient-to-r ${difficultyStyle.bg} shadow-xl ${difficultyStyle.glow} border border-white/20`}
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
                className="font-bold text-white text-xl capitalize flex items-center gap-2"
                style={{ fontFamily: 'var(--caveat)', letterSpacing: '3px' }}>
                  <span>{difficultyStyle.icon}</span>
                  {difficulty}
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