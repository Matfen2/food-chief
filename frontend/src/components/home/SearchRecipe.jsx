import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchRecipe = ({ onSearch }) => {
    const [searchInput, setSearchInput] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    // Soumission du formulaire (click sur bouton ou Enter)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("🔍 Recherche soumise:", searchInput);
        onSearch(searchInput);
    };

    // Clear search
    const handleClear = () => {
        setSearchInput("");
        onSearch("");
    };

    return (
        <section className="w-full max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
            {/* TITRE PRINCIPAL */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-6 sm:mb-8 md:mb-10"
            >
                {/* ✅ Titre responsive : petit sur mobile, grand sur desktop */}
                <motion.h2
                    className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-2 sm:mb-4"
                    style={{ fontFamily: 'var(--amatic)', letterSpacing: '2px' }}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Choisissez Une Recette
                </motion.h2>
                
                {/* ✅ Sous-titre responsive */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white px-2"
                    style={{ fontFamily: 'var(--caveat)', letterSpacing: '1px' }}
                >
                    Parmi des milliers de délicieuses recettes
                </motion.p>
            </motion.div>

            {/* BARRE DE RECHERCHE */}
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative mb-4 sm:mb-6 md:mb-8"
            >
                <div className={`relative flex items-center bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
                    isFocused ? 'shadow-2xl ring-2 sm:ring-4 ring-orange-300/50' : ''
                }`}>
     
                    {/* Input - ✅ Responsive */}
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Rechercher une recette..."
                        className="w-full py-3 sm:py-4 md:py-5 pl-4 sm:pl-6 pr-20 sm:pr-24 md:pr-32 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 placeholder-gray-400 focus:outline-none"
                        style={{ fontFamily: 'var(--caveat)' }}
                    />

                    {/* Bouton clear (si du texte) */}
                    {searchInput && (
                        <motion.button
                            type="button"
                            onClick={handleClear}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute right-14 sm:right-16 md:right-20 text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                            <FaTimes className="text-base sm:text-lg md:text-xl" />
                        </motion.button>
                    )}

                    {/* Bouton Rechercher - ✅ Responsive */}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute right-1.5 sm:right-2 bg-gradient-to-r cursor-pointer from-orange-500 to-orange-600 text-white p-2.5 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                        style={{ fontFamily: 'var(--caveat)', letterSpacing: '1px' }}
                    >
                        <FaSearch className="text-sm sm:text-base" />
                    </motion.button>
                </div>
            </motion.form>
        </section>
    );
};

export default SearchRecipe;