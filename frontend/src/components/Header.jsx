import { Link } from "react-router-dom";
import { useState } from "react";
import logoSite from "../../public/images/foodChiefLogo.png";

const Header = () => {
    const [isConnected, setIsConnected] = useState(false);

    // Logique de connexion/déconnexion simulée se fera via le modale d'authentification plus tard
    const disconnectUser = () => {
    // Simuler une déconnexion utilisateur
        if (!isConnected) { // Condition à paramétrer plus tard via une API
            setIsConnected(false);
            console.log("Utilisateur déconnecté");
            } else {
            setIsConnected(true);
            console.log("Echec de la déconnexion");
        }
    };

    const connectUser = () => {
        // Simuler une connexion utilisateur
        if (!isConnected) { // Condition à paramétrer plus tard via une API
            setIsConnected(true);
            console.log("Utilisateur connecté");
        } else {
            setIsConnected(false);
            console.log("Echec de la connexion");
        }
    };

  return (
    <header className="flex flex-row mx-2 sm:mx-4 items-center justify-between">
        <Link to="/">
            <img
                src={logoSite}
                alt="Food Chief Logo"
                className="h-34 w-auto"
            />
        </Link>

        {/* Connexion/Déconnexion */}
        {
            isConnected ? (
                <button
                    onClick={disconnectUser}
                    style={{ fontFamily: 'var(--caveat)', letterSpacing: "2px"}}
                    className="relative bg-[var(--primary)] text-white px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 rounded-lg sm:rounded-xl cursor-pointer font-semibold overflow-hidden text-xs sm:text-sm md:text-base"
                >
                    Se déconnecter
                </button>
            ) : (
                <button
                    onClick={connectUser}
                    style={{ fontFamily: 'var(--caveat)', letterSpacing: "2px"}}
                    className="relative bg-[var(--primary)] text-white px-4 py-2 rounded-lg sm:rounded-xl cursor-pointer font-semibold overflow-hidden text-xl"
                >
                    Se connecter
                </button>
            )
        }
    </header>
  )
}

export default Header
