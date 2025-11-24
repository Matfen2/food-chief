import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaClock, FaUsers, FaFire } from "react-icons/fa";

const CardRecipe = ({ recipe }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/recipe/${recipe._id}`);
    };

    // Couleur badge difficulté
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case "Facile":
                return "from-green-400 to-green-600";
            case "Moyen":
                return "from-orange-400 to-orange-600";
            case "Difficile":
                return "from-red-400 to-red-600";
            default:
                return "from-gray-400 to-gray-600";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8 }}
            onClick={handleClick}
            className="group relative h-64 xs:h-72 sm:h-80 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
        >
            {/* IMAGE DE FOND (toujours visible) */}
            <motion.img
                src={recipe.image || "https://via.placeholder.com/400x300?text=Food+Chief"}
                alt={recipe.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* OVERLAY NOIR (apparaît au hover) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* CONTENU CENTRÉ AU MILIEU (apparaît au hover) */}
            <div className="absolute inset-0 flex flex-col justify-center items-center p-4 sm:p-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">

                {/* TITRE - ✅ Responsive */}
                <h3
                    className="text-2xl xs:text-3xl sm:text-3xl md:text-4xl text-center font-bold text-white mb-4 sm:mb-6 line-clamp-2 drop-shadow-lg px-2"
                    style={{ fontFamily: 'var(--amatic)', letterSpacing: '1px' }}
                >
                    {recipe.title}
                </h3>

                {/* BADGES - ✅ Responsive : wrap sur mobile, horizontal sur desktop */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                    
                    {/* Badge Temps */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-md px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/30"
                    >
                        <FaClock className="text-orange-400 text-sm sm:text-lg" />
                        <span className="text-white font-bold text-xs sm:text-sm">
                            {(recipe.prepTime || 0) + (recipe.cookTime || 0)} min
                        </span>
                    </motion.div>

                    {/* Badge Portions */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-md px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/30"
                    >
                        <FaUsers className="text-blue-400 text-sm sm:text-lg" />
                        <span className="text-white font-bold text-xs sm:text-sm">
                            {recipe.servings || 1} pers.
                        </span>
                    </motion.div>

                    {/* Badge Difficulté */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={`bg-gradient-to-r ${getDifficultyColor(recipe.difficulty)} text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-xl flex items-center gap-1.5 sm:gap-2`}
                    >
                        <FaFire className="text-xs" />
                        <span className="hidden xs:inline">{recipe.difficulty}</span>
                        {/* Version courte sur très petit écran */}
                        <span className="xs:hidden">
                            {recipe.difficulty === "Facile" ? "Easy" : 
                             recipe.difficulty === "Moyen" ? "Med" : "Hard"}
                        </span>
                    </motion.div>
                </div>

                {/* AUTEUR (optionnel) - ✅ Responsive */}
                {recipe.author && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        className="text-center text-white/70 text-xs sm:text-sm mt-3 sm:mt-4"
                    >
                        Par {recipe.author}
                    </motion.p>
                )}
            </div>

            {/* EFFET BRILLANCE (au hover) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000" />
            </div>
        </motion.div>
    );
};

export default CardRecipe;