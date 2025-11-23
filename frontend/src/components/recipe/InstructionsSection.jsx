import { motion } from "framer-motion";
import { useState } from "react";

const InstructionsSection = ({ instructions }) => {
  const [completedSteps, setCompletedSteps] = useState({});

  const toggleStep = (index) => {
    setCompletedSteps(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progress = (completedCount / instructions.length) * 100;

  return (
    <motion.div
      className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      {/* Header */}
      <div className="relative p-8 border-b border-white/10">
        {/* Background animé */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-orange-500/5"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "200% 200%" }}
        />

        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-4xl md:text-5xl font-bold uppercase tracking-wider flex items-center gap-3"
              style={{ fontFamily: "var(--amatic)" }}
            >
              Étapes à suivre
            </h2>

            {/* Badge de progression */}
            <motion.div
              className="px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 backdrop-blur-sm"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: "spring" }}
            >
              <span 
                className="text-orange-300 font-bold text-md"
                style={{ fontFamily: "var(--caveat)", letterSpacing: "3px" }}>
                {completedCount}/{instructions.length} ✓
              </span>
            </motion.div>
          </div>

          {/* Barre de progression */}
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 shadow-lg shadow-green-500/50"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
      
      {/* Liste des étapes */}
      <div className="overflow-auto max-h-[500px] p-8 recipe-scroll">
        <div className="space-y-6">
          {instructions.map((instruction, index) => {
            const stepNumber = instruction.step || index + 1;
            const stepText = instruction.description || instruction;
            const stepKey = instruction._id || instruction.step || index;
            const isCompleted = completedSteps[index];

            return (
              <motion.div
                key={stepKey}
                className="relative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                {/* Ligne de connexion entre les étapes */}
                {index < instructions.length - 1 && (
                  <div className="absolute left-6 top-14 w-0.5 h-full bg-gradient-to-b from-orange-400/50 to-transparent" />
                )}

                <motion.div
                  className={`flex gap-6 group cursor-pointer ${
                    isCompleted ? "opacity-70" : ""
                  }`}
                  onClick={() => toggleStep(index)}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Numéro de l'étape avec animation */}
                  <motion.div
                    className="relative flex-shrink-0 z-10"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl blur-xl"
                      style={{
                        background: isCompleted
                          ? "linear-gradient(135deg, rgba(34, 197, 94, 0.4), rgba(16, 185, 129, 0.4))"
                          : "linear-gradient(135deg, rgba(251, 146, 60, 0.4), rgba(249, 115, 22, 0.4))"
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />

                    <motion.div
                      className={`relative w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-white shadow-xl border-2 ${
                        isCompleted
                          ? "bg-gradient-to-br from-green-500 to-emerald-600 border-green-400"
                          : "bg-gradient-to-br from-orange-500 to-orange-600 border-orange-400"
                      }`}
                      animate={isCompleted ? { rotate: 360 } : {}}
                      transition={{ duration: 0.6 }}
                      style={{ fontFamily: "var(--amatic)", letterSpacing: "3px" }}
                    >
                      {isCompleted ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-3xl"
                        >
                          ✓
                        </motion.span>
                      ) : (
                        <span className="text-2xl">{stepNumber}</span>
                      )}
                    </motion.div>
                  </motion.div>

                  {/* Description de l'étape */}
                  <motion.div
                    className={`flex-1 p-5 rounded-2xl transition-all ${
                      isCompleted
                        ? "bg-green-500/10 border-2 border-green-500/30"
                        : "bg-white/5 group-hover:bg-white/10 border-2 border-white/10 group-hover:border-orange-400/30"
                    }`}
                    layout
                  >
                    <p
                      className={`leading-relaxed text-xl transition-all ${
                        isCompleted
                          ? "line-through text-gray-400"
                          : "text-gray-200 group-hover:text-white"
                      }`}
                      style={{ fontFamily: "var(--caveat)", letterSpacing: "3px" }}
                    >
                      {stepText}
                    </p>

                    {/* Checkbox visuel en bas à droite */}
                    <div className="flex justify-end mt-3">
                      <motion.div
                        className={`text-md px-3 py-1 rounded-full ${
                          isCompleted
                            ? "bg-green-500/20 text-green-300"
                            : "bg-orange-500/20 text-orange-300"
                        }`}
                        style={{ fontFamily: "var(--amatic)", letterSpacing: "3px" }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {isCompleted ? "✓ Terminé" : "Cliquer quand fait"}
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Message de félicitations si toutes les étapes sont faites */}
        {completedCount === instructions.length && (
          <motion.div
            className="mt-10 p-8 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-600/20 border-2 border-green-500/40"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="text-center">
    
              <h3 
                className="text-4xl font-bold text-green-300 mb-2" 
                style={{ fontFamily: "var(--amatic)", letterSpacing: "3px" }}>
                Félicitations !
              </h3>
              <p 
                className="text-green-200 text-2xl"
                style={{ fontFamily: "var(--caveat)", letterSpacing: "3px" }}
              >
                Vous avez terminé toutes les étapes. Bonne dégustation ! 🍽️✨
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default InstructionsSection;