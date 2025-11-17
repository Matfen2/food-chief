import { Link } from "react-router-dom";
import logoSite from "../../public/images/foodChiefLogo.png";

const Header = () => {
  return (
    <header className="flex flex-row mx-4 items-center justify-between">
      <Link to="/">
        <img src={logoSite} className="w-34 h-34 cursor-pointer" alt="logo food chief" />
      </Link>

      {/* CONNEXION */}
      <button 
        style={{ fontFamily: 'var(--spbutch)', letterSpacing: "4px" }}
        className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-4 py-2 rounded-lg cursor-pointer">
        SE CONNECTER
      </button>
    </header>
  )
}

export default Header
