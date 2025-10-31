import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="sticky top-0 z-100 text-white">
        <div className="mx-auto flex max-w-full items-center justify-between px-6 py-3">
          {/* Logo + Lien Accueil */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-wider hover:text-[#52B788] transition-colors"
            style={{ fontFamily: "var(--amatic)", letterSpacing: "4px" }}
          >
            Food Chief
          </Link>

          {/* Boutons droite */}
          <div className="flex items-center gap-4">
            {/* Si connecté */}
            
            <div className="relative">
              <button
                style={{ fontFamily: "var(--bebas)", letterSpacing: "6px" }} 
                className="rounded-xl bg-white/10 cursor-pointer text-md backdrop-blur-none px-4 py-2 font-semibold hover:bg-[#2D6A4F] hover:scale-115 transition duration-200">
                Se connecter
              </button>
            </div>
          </div>
        </div>
      </header>
  )
}

export default Header
