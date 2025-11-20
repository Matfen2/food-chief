import { FiPackage } from "react-icons/fi";
import { calculateQuantity } from "../../utils/recipeUtils";

const IngredientsSection = ({ 
  ingredients, 
  ustensiles, 
  checkedIngredients, 
  onToggleIngredient, 
  servings,
  originalServings 
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl flex flex-col overflow-hidden">
      {/* Header avec gradient */}
      <div className="p-8 border-b border-white/20 bg-gradient-to-r from-orange-500/10 via-transparent to-orange-500/5">
        <h2
          className="text-4xl font-bold uppercase tracking-wider flex items-center gap-3"
          style={{ fontFamily: "var(--amatic)" }}
        >
          <span className="text-orange-400">→</span>
          Ingrédients
          <span className="text-2xl text-gray-400 font-normal">({servings} pers.)</span>
        </h2>
      </div>
      
      {/* Liste scrollable avec custom scrollbar */}
      <div className="overflow-auto h-[450px] p-8 recipe-scroll">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
          {ingredients.map((ingredient, index) => {
            const adjustedQuantity = calculateQuantity(
              ingredient.quantity,
              originalServings,
              servings
            );

            return (
              <label
                key={index}
                className="flex items-center gap-3 cursor-pointer group hover:bg-white/5 -mx-3 px-3 py-3 rounded-xl transition-all"
              >
                <input
                  type="checkbox"
                  checked={checkedIngredients[index] || false}
                  onChange={() => onToggleIngredient(index)}
                  className="w-5 h-5 rounded-md border-2 border-white/30 bg-white/10 checked:bg-gradient-to-br checked:from-orange-500 checked:to-orange-600 checked:border-orange-400 cursor-pointer transition-all accent-orange-500 shadow-lg flex-shrink-0"
                />
                <span
                  className={`font-medium transition-all text-base ${
                    checkedIngredients[index]
                      ? "line-through text-gray-400 opacity-60"
                      : "text-white group-hover:text-orange-100"
                  }`}
                  style={{ fontFamily: "var(--spbutch)" }}
                >
                  <span className="font-bold text-orange-300">{adjustedQuantity}</span> {ingredient.name}
                </span>
              </label>
            );
          })}
        </div>

        {/* Ustensiles avec icône */}
        {ustensiles?.length > 0 && (
          <div className="mt-8 pt-8 border-t border-white/20">
            <h3
              className="text-3xl font-bold mb-5 uppercase tracking-wider flex items-center gap-2"
              style={{ fontFamily: "var(--amatic)" }}
            >
              <FiPackage className="w-6 h-6 text-orange-400" />
              Ustensiles
            </h3>
            <div className="flex flex-wrap gap-3">
              {ustensiles.map((ustensile, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm border border-white/20 hover:border-orange-400/50 hover:from-white/30 hover:to-white/20 transition-all shadow-lg hover:scale-105"
                  style={{ fontFamily: "var(--spbutch)" }}
                >
                  {ustensile}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IngredientsSection;