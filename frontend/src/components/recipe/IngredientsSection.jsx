import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiPackage } from "react-icons/fi";

const IngredientsSection = ({ 
  ingredients, 
  ustensiles, 
  checkedIngredients, 
  onToggleIngredient, 
  servings,
  originalServings 
}) => {
  // Calcul des quantités
  const calculateQuantity = (originalQuantity, originalServings, newServings) => {
    if (!originalQuantity || originalServings === 0) return originalQuantity;
    const numQuantity = parseFloat(originalQuantity);
    if (isNaN(numQuantity)) return originalQuantity;
    const ratio = newServings / originalServings;
    const calculated = numQuantity * ratio;
    return calculated.toFixed(1).replace(/\.0$/, '');
  };

  // Compter les ingrédients cochés
  const checkedCount = Object.values(checkedIngredients).filter(Boolean).length;
  const totalCount = ingredients.length;
  const progress = (checkedCount / totalCount) * 100;

  return (
    <motion.div
      className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      {/* ====================================================
          HEADER - ✅ Responsive
          ==================================================== */}
      <div className="relative p-4 sm:p-6 md:p-8 border-b border-white/10">
        {/* Background décoratif */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-orange-500/5"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "200% 200%" }}
        />

        <div className="relative">
          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-0 mb-3 sm:mb-4">
            <h2
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider flex flex-wrap items-center gap-2 sm:gap-3"
              style={{ fontFamily: "var(--amatic)" }}
            >
              Ingrédients
              <span 
                className="text-lg xs:text-xl sm:text-2xl text-gray-300 font-normal tracking-wide" 
                style={{ fontFamily: "var(--caveat)", letterSpacing: '2px' }}
              >
                ({servings} pers.)
              </span>
            </h2>

            {/* Badge de progression */}
            <motion.div
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-orange-500/20 border border-orange-500/30 backdrop-blur-sm self-start xs:self-auto"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: "spring" }}
            >
              <span 
                className="text-orange-300 font-bold text-sm sm:text-md"
                style={{ fontFamily: "var(--caveat)", letterSpacing: '2px' }}
              >
                {checkedCount}/{totalCount} ✓
              </span>
            </motion.div>
          </div>

          {/* Barre de progression */}
          <div className="w-full h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 to-orange-400 shadow-lg shadow-orange-500/50"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
      
      {/* ====================================================
          LISTE DES INGRÉDIENTS - ✅ Responsive
          ==================================================== */}
      <div className="overflow-auto max-h-[400px] sm:max-h-[450px] md:max-h-[500px] p-4 sm:p-6 md:p-8 recipe-scroll">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
          {ingredients.map((ingredient, index) => {
            const adjustedQuantity = calculateQuantity(
              ingredient.quantity,
              originalServings,
              servings
            );
            const isChecked = checkedIngredients[index] || false;

            return (
              <motion.label
                key={index}
                className={`relative flex items-center gap-2 sm:gap-3 md:gap-4 cursor-pointer p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 group ${
                  isChecked 
                    ? "bg-gradient-to-r from-orange-500/20 to-orange-600/10 border-2 border-orange-500/40" 
                    : "bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-orange-400/30"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.03 }}
                whileHover={{ scale: 1.02, x: 3 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Checkbox custom */}
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleIngredient(index)}
                    className="sr-only"
                  />
                  
                  <motion.div
                    className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-lg sm:rounded-xl flex items-center justify-center border-2 transition-all ${
                      isChecked
                        ? "bg-gradient-to-br from-orange-500 to-orange-600 border-orange-400 shadow-lg shadow-orange-500/50"
                        : "bg-white/10 border-white/30 group-hover:border-orange-400/50"
                    }`}
                    animate={isChecked ? { rotate: [0, 360] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <AnimatePresence>
                      {isChecked && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <FiCheck className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white font-bold" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Texte de l'ingrédient */}
                <span
                  className={`font-medium text-base sm:text-lg md:text-xl transition-all flex-1 ${
                    isChecked
                      ? "line-through text-gray-400 opacity-70"
                      : "text-white group-hover:text-orange-100"
                  }`}
                  style={{ fontFamily: "var(--caveat)", letterSpacing: '2px' }}
                >
                  <motion.span 
                    className="font-bold text-orange-300"
                    animate={isChecked ? {} : { scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.3 }}
                  >
                    {adjustedQuantity}
                  </motion.span>{" "}
                  {ingredient.name}
                </span>

                {/* Particules quand coché */}
                <AnimatePresence>
                  {isChecked && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-400 rounded-full"
                          initial={{
                            x: "50%",
                            y: "50%",
                            scale: 0,
                          }}
                          animate={{
                            x: `${Math.random() * 100}%`,
                            y: `${Math.random() * 100}%`,
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 0.8,
                            delay: i * 0.1,
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.label>
            );
          })}
        </div>

        {/* ====================================================
            USTENSILES - ✅ Responsive
            ==================================================== */}
        {ustensiles?.length > 0 && (
          <motion.div
            className="mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-6 md:pt-8 border-t border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <h3
              className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 md:mb-6 uppercase tracking-wider flex items-center gap-2 sm:gap-3"
              style={{ fontFamily: "var(--amatic)" }}
            >
              <FiPackage className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
              Appareils
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {ustensiles.map((ustensile, index) => (
                <motion.span
                  key={index}
                  className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full text-sm sm:text-base md:text-xl border border-white/20 hover:border-orange-400/50 hover:from-orange-500/20 hover:to-orange-600/10 transition-all shadow-lg cursor-default"
                  style={{ fontFamily: "var(--caveat)", letterSpacing: '2px' }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  {ustensile}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default IngredientsSection;