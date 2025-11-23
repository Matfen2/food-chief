import { motion } from "framer-motion";
import { useState } from "react";

const RecipeHeader = ({ image, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full mb-12">
      {/* Image avec effet parallax et glow */}
      <motion.div
        className="relative w-72 h-72 md:w-80 md:h-80 mx-auto mb-10"
        initial={{ opacity: 0, scale: 0.8, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Glow effect animé */}
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(251,146,60,0.4) 0%, rgba(249,115,22,0.2) 50%, transparent 70%)",
          }}
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            opacity: isHovered ? [0.6, 1, 0.6] : 0.4,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Cercles décoratifs en arrière-plan */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-orange-500/30"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border-2 border-orange-400/20"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Image principale */}
        {image ? (
          <motion.img
            src={image}
            alt={title}
            className="relative w-full h-full object-cover rounded-full shadow-2xl border-4 border-white/20 z-10"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.4 }}
          />
        ) : (
          <div className="relative w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 rounded-full shadow-2xl flex items-center justify-center border-4 border-white/20 z-10">
            <span className="text-gray-400 text-lg text-center px-4">
              🍽️ Image de la recette
            </span>
          </div>
        )}
      </motion.div>

      {/* Titre avec effet gradient animé */}
      <motion.h1
        className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wider text-center mb-6 px-4"
        style={{ fontFamily: "var(--amatic)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <motion.span
          className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-300 bg-clip-text text-transparent"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        >
          {title}
        </motion.span>
      </motion.h1>

      {/* Description avec animation */}
      <motion.p
        className="md:text-3xl font-bold   to-blue-100   leading-relaxed text-center max-w-5xl mx-auto px-6"
        style={{ fontFamily: 'var(--caveat)', letterSpacing: '3px' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {description}
      </motion.p>
    </div>
  );
};

export default RecipeHeader;