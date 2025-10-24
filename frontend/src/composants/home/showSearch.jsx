import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Header from "../../uielemennts/Header";

export default function ShowSearch({ onSearch }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(value.trim());
  };

  return (
    <section
      className="relative h-[740px] bg-cover bg-center"
      // Image servie depuis public/images
      style={{ backgroundImage: "url('/images/headerbg.png')" }}
    >
      {/* voile sombre */}
      <div className="absolute inset-0 bg-black/50" />

      {/* barre du haut */}
      <Header />

      {/* contenu principal */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="mx-auto max-w-7xl px-4 w-full">
          <h1 className="text-white text-center text-7xl font-semibold mb-6" style={{fontFamily: "var(--amatic)"}}>
            Choisissez une recette parmi tant d&apos;autres
          </h1>

          {/* barre de recherche floutée */}
          <form onSubmit={handleSubmit} className="max-w-4xl relative mx-auto">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Recherchez une recette, un ingrédient..."
              className="
                w-full h-14 pl-5 pr-14 rounded-2xl
                text-white placeholder-white/80
                bg-white/10 backdrop-blur-none
                ring-1 ring-white/20 focus:ring-white/40
                shadow-[0_10px_30px_-10px_rgba(0,0,0,.45)]
                outline-none transition
              "
              aria-label="Rechercher une recette"
            />

            <button
              type="submit"
              aria-label="Rechercher"
              className="
                absolute right-2 top-1/2 -translate-y-1/2
                flex items-center justify-center
                h-10 w-10 rounded-lg cursor-pointer
                bg-[#1B4332] hover:bg-[#2D6A4F]
                shadow-md hover:scale-105 active:scale-95
                transition
              "
            >
              <FaSearch className="text-white text-lg" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
