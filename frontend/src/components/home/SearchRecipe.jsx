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
        onSearch(searchInput); // Appelle la fonction du parent
    };

    // Clear search
    const handleClear = () => {
        setSearchInput("");
        onSearch(""); // Reset la recherche dans le parent
    };

    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-12">
            {/* TITRE PRINCIPAL */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-10"
            >
                <motion.h2
                    className="text-8xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent mb-4"
                    style={{ fontFamily: 'var(--amatic)', letterSpacing: '3px' }}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Choisissez Une Recette
                </motion.h2>
                
                {/* Sous-titre */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl md:text-4xl text-white"
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
                className="relative mb-8"
            >
                <div className={`relative flex items-center bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
                    isFocused ? 'shadow-2xl ring-4 ring-orange-300/50' : ''
                }`}>
     
                    {/* Input */}
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Rechercher une recette délicieuse..."
                        className="w-full py-5 pl-6 pr-32 text-lg text-gray-800 placeholder-gray-400 focus:outline-none"
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
                            className="absolute right-20 text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <FaTimes className="text-xl" />
                        </motion.button>
                    )}

                    {/* Bouton Rechercher */}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute right-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                        style={{ fontFamily: 'var(--caveat)', letterSpacing: '1px' }}
                    >
                        <FaSearch />
                    </motion.button>
                </div>
            </motion.form>
        </section>
    );
};

export default SearchRecipe;