import { FiSearch } from "react-icons/fi"

const SearchRecipe = () => {
  return (
    <div className="mt-30 px-4 py-8 md:py-0">
      <div className="text-center text-white max-w-6xl w-full">
        {/* Titre responsive */}
        <h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold md:mb-4 drop-shadow-2xl animate-fade-in px-4"
          style={{ fontFamily: 'var(--amatic)', lineHeight: '1.2' }}
        >
          CHOISISSEZ UNE RECETTE PARMI TANT D'AUTRES
        </h1>
        
        {/* Barre de recherche responsive */}
        <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl mx-auto">
          <input
            type="text"
            placeholder="Recherchez une recette, un ingrédient..."
            className="flex-1 px-6 sm:px-8 py-4 sm:py-5 text-gray-800 placeholder-gray-400 focus:outline-none text-base sm:text-lg"
            style={{ fontFamily: 'var(--spbutch)' }}
          />
          
          <button 
            className="m-2 px-4 py-3 sm:py-4 rounded-xl text-white cursor-pointer font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center"
            style={{ 
              backgroundColor: 'var(--primary)',
              fontFamily: 'var(--spbutch)'
            }}
          >
            <FiSearch className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="ml-2 sm:hidden">Rechercher</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchRecipe