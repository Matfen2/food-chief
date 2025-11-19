import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiClock, FiUsers, FiStar } from "react-icons/fi";

const CardRecipe = ({ 
  id, 
  title, 
  image, 
  prepTime, 
  cookTime, 
  servings, 
  difficulty,
  isFavorite 
}) => {
  const navigate = useNavigate();

  const showRecipe = () => {
    navigate(`/recipe/${id}`);
  };

  return (
    <motion.article
      onClick={showRecipe}
      className="relative h-80 rounded-2xl overflow-hidden cursor-pointer group shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image de fond */}
      <div className="absolute inset-0">
        {image ? (
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
        )}
      </div>

      {/* Overlay gradient - plus foncé au hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/80 group-hover:via-black/50 group-hover:to-black/30 transition-all duration-300" />

      {/* Badge Favori */}
      {isFavorite && (
        <motion.div
          className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <FiStar className="w-5 h-5 text-yellow-500 fill-yellow-500" />
        </motion.div>
      )}

      {/* Contenu qui apparaît au hover */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
        <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex flex-col items-center gap-4">
          
          {/* Titre */}
          <h3
            className="text-3xl md:text-4xl font-bold text-center drop-shadow-2xl"
            style={{ fontFamily: "var(--amatic)" }}
          >
            {title}
          </h3>

          {/* Informations */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Temps total */}
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <FiClock className="w-4 h-4" />
              <span className="text-sm font-semibold">{prepTime + cookTime} min</span>
            </div>

            {/* Portions */}
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <FiUsers className="w-4 h-4" />
              <span className="text-sm font-semibold">{servings} pers.</span>
            </div>

            {/* Badge Difficulté */}
            <div 
              className={`px-4 py-1.5 rounded-full font-semibold text-sm ${
                difficulty === "Facile" 
                  ? "bg-green-500/80" 
                  : difficulty === "Moyen" 
                  ? "bg-orange-500/80" 
                  : "bg-red-500/80"
              }`}
            >
              {difficulty}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default CardRecipe;