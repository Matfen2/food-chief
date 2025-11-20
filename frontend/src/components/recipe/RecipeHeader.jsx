import { motion } from "framer-motion";

const ANIMATION_VARIANTS = {
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }
};

const RecipeHeader = ({ image, title, description }) => {
  return (
    <>
      {/* Image circulaire avec effet glow */}
      <motion.div
        className="mb-10"
        variants={ANIMATION_VARIANTS.item}
      >
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          {/* Glow effect derrière l'image */}
          <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full scale-110 animate-pulse" />
          
          {image ? (
            <img
              src={image}
              alt={title}
              className="relative w-full h-full object-cover rounded-full shadow-2xl border-4 border-white/30 hover:border-orange-400/50 transition-all duration-500"
            />
          ) : (
            <div className="relative w-full h-full bg-gray-700/50 backdrop-blur-sm rounded-full shadow-2xl flex items-center justify-center border-4 border-white/30">
              <span className="text-gray-400 text-lg text-center px-4">
                Image de la recette
              </span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Titre avec effet dégradé */}
      <motion.h1
        className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider text-center mb-6 bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent"
        style={{ fontFamily: "var(--amatic)" }}
        variants={ANIMATION_VARIANTS.item}
      >
        {title}
      </motion.h1>

      {/* Description avec meilleur espacement */}
      <motion.p
        className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed text-center max-w-3xl px-4"
        style={{ fontFamily: "var(--spbutch)" }}
        variants={ANIMATION_VARIANTS.item}
      >
        {description}
      </motion.p>
    </>
  );
};

export default RecipeHeader;