import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardRecipe from "./CardRecipe";
import { FaUtensils, FaExclamationTriangle, FaSearch } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import { BiDish } from "react-icons/bi";
import { recipeService } from "../../services/api.js";

const ListRecipes = ({ searchQuery }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Appel API quand searchQuery change
    useEffect(() => {
        fetchRecipes();
    }, [searchQuery]);

    const fetchRecipes = async () => {
        try {
            setLoading(true);
            setError(null);
            
            console.log(searchQuery ? `🔍 Recherche: ${searchQuery}` : "📋 Chargement de toutes les recettes");
            
            const response = await recipeService.getAll(searchQuery);
            const data = response.data || response;
            
            console.log(`✅ ${data.length} recette(s) reçue(s)`);
            setRecipes(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("❌ Erreur:", err);
            setError(err.message || "Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    };

    // ============================================
    // ÉTAT LOADING - ✅ Responsive
    // ============================================
    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-4"
            >
                {/* Spinner responsive */}
                <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-6 sm:mb-8">
                    <motion.div
                        className="absolute inset-0 border-3 sm:border-4 border-orange-200 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute inset-2 sm:inset-3 border-3 sm:border-4 border-orange-400 rounded-full border-t-transparent"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute inset-4 sm:inset-6 border-3 sm:border-4 border-orange-600 rounded-full border-t-transparent border-r-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <FaUtensils className="text-2xl sm:text-3xl md:text-4xl text-orange-500" />
                    </motion.div>
                </div>
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                >
                    <h3 
                        className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2"
                        style={{ fontFamily: 'var(--amatic)', letterSpacing: '1px' }}
                    >
                        {searchQuery ? "Recherche en cours..." : "Chargement des recettes..."}
                    </h3>
                    <div className="flex justify-center items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full"
                                animate={{ 
                                    y: [0, -8, 0],
                                    opacity: [0.3, 1, 0.3]
                                }}
                                transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    delay: i * 0.2
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        );
    }

    // ============================================
    // ÉTAT ERROR - ✅ Responsive
    // ============================================
    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-3 sm:px-4"
            >
                <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 max-w-sm sm:max-w-md shadow-xl sm:shadow-2xl w-full">
                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex justify-center mb-4 sm:mb-6"
                    >
                        <div className="relative">
                            <motion.div
                                className="absolute inset-0 bg-red-500/20 rounded-full blur-xl"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <div className="relative bg-red-500 p-4 sm:p-6 rounded-full">
                                <FaExclamationTriangle className="text-3xl sm:text-4xl md:text-5xl text-white" />
                            </div>
                        </div>
                    </motion.div>
                    <h3 
                        className="text-3xl sm:text-4xl font-bold text-red-600 mb-3 sm:mb-4 text-center"
                        style={{ fontFamily: 'var(--amatic)', letterSpacing: '1px' }}
                    >
                        Oups, une erreur !
                    </h3>
                    <p className="text-gray-700 text-center mb-4 sm:mb-6 text-base sm:text-lg">
                        {error}
                    </p>
                    <div className="bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6">
                        <p className="text-xs sm:text-sm text-gray-600 mb-2 font-semibold">💡 Suggestions :</p>
                        <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                            <li>• Vérifiez votre connexion internet</li>
                            <li>• Le serveur est peut-être indisponible</li>
                            <li>• Réessayez dans quelques instants</li>
                        </ul>
                    </div>
                    <motion.button
                        onClick={fetchRecipes}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg"
                        style={{ fontFamily: 'var(--caveat)', letterSpacing: '1px' }}
                    >
                        <IoReload className="text-xl sm:text-2xl" />
                        Réessayer
                    </motion.button>
                </div>
            </motion.div>
        );
    }

    // ============================================
    // AUCUN RÉSULTAT - ✅ Responsive
    // ============================================
    if (recipes.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-3 sm:px-4"
            >
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 max-w-sm sm:max-w-md shadow-lg sm:shadow-xl w-full">
                    <motion.div
                        animate={{ 
                            rotate: [0, -5, 5, -5, 0],
                            y: [0, -10, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="flex justify-center mb-4 sm:mb-6"
                    >
                        <div className="relative">
                            <motion.div
                                className="absolute inset-0 bg-orange-500/20 rounded-full blur-2xl"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <div className="relative bg-gradient-to-br from-orange-400 to-orange-600 p-6 sm:p-8 rounded-full">
                                {searchQuery ? (
                                    <FaSearch className="text-4xl sm:text-5xl md:text-6xl text-white" />
                                ) : (
                                    <BiDish className="text-4xl sm:text-5xl md:text-6xl text-white" />
                                )}
                            </div>
                        </div>
                    </motion.div>
                    <h3 
                        className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 text-center"
                        style={{ fontFamily: 'var(--amatic)', letterSpacing: '1px' }}
                    >
                        {searchQuery ? "Aucun résultat" : "Aucune recette"}
                    </h3>
                    <p 
                        className="text-lg sm:text-xl text-gray-600 text-center mb-4 sm:mb-6"
                        style={{ fontFamily: 'var(--caveat)' }}
                    >
                        {searchQuery ? (
                            <>Aucune recette pour "<span className="font-bold text-orange-600 break-all">{searchQuery}</span>"</>
                        ) : (
                            "Soyez le premier à partager une recette ! 🍳"
                        )}
                    </p>
                    {searchQuery && (
                        <p className="text-gray-500 text-center text-xs sm:text-sm mb-4 sm:mb-6">
                            Essayez avec d'autres mots-clés !
                        </p>
                    )}
                    <div className="flex justify-center gap-3 sm:gap-4 text-3xl sm:text-4xl opacity-50">
                        <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>🍕</motion.span>
                        <motion.span animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}>🍰</motion.span>
                        <motion.span animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}>🥗</motion.span>
                    </div>
                </div>
            </motion.div>
        );
    }

    // ============================================
    // AFFICHAGE DES RECETTES - ✅ Responsive
    // ============================================
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="w-full px-2 sm:px-4 pb-12 sm:pb-16 md:pb-20">
            {/* Header section */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center mb-8 sm:mb-10 md:mb-12"
            >
                {/* Titre - ✅ Responsive */}
                <motion.h2 
                    className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-3 sm:mb-4 px-2"
                    style={{ fontFamily: 'var(--amatic)', letterSpacing: '2px' }}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    {searchQuery ? (
                        <>
                            <span className="hidden sm:inline">Résultats pour "</span>
                            <span className="sm:hidden">Résultats : </span>
                            <span className="break-all">{searchQuery}</span>
                            <span className="hidden sm:inline">"</span>
                        </>
                    ) : (
                        'Nos Délicieuses Recettes'
                    )}
                </motion.h2>
                
                {/* Compteur */}
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-base sm:text-lg md:text-xl text-gray-600 mt-3 sm:mt-4 flex items-center justify-center gap-2"
                    style={{ fontFamily: 'var(--caveat)' }}
                >
                    <FaSearch className="text-orange-500 text-sm sm:text-base" />
                    {recipes.length} recette{recipes.length > 1 ? 's' : ''} trouvée{recipes.length > 1 ? 's' : ''}
                </motion.p>
            </motion.div>

            {/* Grille des recettes - ✅ Responsive */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 -mt-4"
            >
                <AnimatePresence>
                    {recipes.map((recipe, index) => (
                        <motion.div
                            key={recipe._id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ 
                                duration: 0.5, 
                                delay: index * 0.05,
                                ease: "easeOut"
                            }}
                        >
                            <CardRecipe recipe={recipe} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default ListRecipes;